import mongoose from 'mongoose';
import type { WalletModelAdapter, WalletSlice } from './adapter.types';

// Definimos la interfaz interna del documento en Mongo para evitar 'any'
interface WalletDocument {
  balance?: number;
  lowBalanceThreshold?: number;
  flags?: Record<string, unknown>;
  lastLowBalanceNotification?: Date;
  updatedAt?: Date;
  createdAt?: Date;
  // Permitimos campos dinámicos porque 'idField' es variable (users_id, userId, etc.)
  [key: string]: unknown;
}

function getDb() {
  if (!mongoose.connection.db) throw new Error('Database not connected');
  return mongoose.connection.db;
}

// Helper para construir el valor del ID (ObjectId o String o Query $in)
function toQueryForId(
  id: string,
): mongoose.Types.ObjectId | string | { $in: (string | mongoose.Types.ObjectId)[] } {
  const asObjId = /^[0-9a-fA-F]{24}$/.test(String(id))
    ? new mongoose.Types.ObjectId(String(id))
    : String(id);

  // Si la variable de entorno fuerza ObjectId
  if (process.env.WALLET_USER_ID_IS_OBJECTID === 'true') {
    return asObjId;
  }

  // Por defecto busca por string o por ObjectId (híbrido)
  return { $in: [String(id), asObjId] };
}

/** Wallet en colección separada, referenciando usuario por WALLET_USER_ID_FIELD */
export function makeWalletCollectionByUserIdAdapter(
  collectionName: string,
  idField: string = 'users_id',
): WalletModelAdapter {
  /*interface WalletSeparateDoc {
    balance?: number;
    lowBalanceThreshold?: number;
    flags?: unknown;
    lastLowBalanceNotification?: Date | null;
    [key: string]: unknown; // soporta campos dinámicos
  }
  interface WalletUpdateSet {
    updatedAt: Date;
    balance?: number;
    lowBalanceThreshold?: number;
    flags?: unknown;
    lastLowBalanceNotification?: Date | null;
  } */
  return {
    async getWalletById(fixerId: string): Promise<WalletSlice | null> {
      const db = getDb();

      // Construimos la query usando Record para evitar 'any' y permitir la llave dinámica 'idField'
      const query: Record<string, unknown> = {
        [idField]: toQueryForId(fixerId),
      };

      const doc = await db.collection<WalletDocument>(collectionName).findOne(query, {
        projection: {
          balance: 1,
          lowBalanceThreshold: 1,
          flags: 1,
          lastLowBalanceNotification: 1,
        },
      });

      if (!doc) return null;

      // Mapeo seguro de datos
      //const flags = (doc.flags as Record<string, unknown>) ?? null;

      return {
        balance: Number(doc.balance ?? 0),
        lowBalanceThreshold: Number(doc.lowBalanceThreshold ?? 0),
        flags: doc.flags ?? null,
        lastLowBalanceNotification: doc.lastLowBalanceNotification ?? null,
      };
    },
    async updateWalletById(fixerId: string, patch: Partial<WalletSlice>): Promise<void> {
      const db = getDb();

      const query: Record<string, unknown> = {
        [idField]: toQueryForId(fixerId),
      };

      // Usamos Record<string, unknown> en lugar de any
      const $set: Record<string, unknown> = { updatedAt: new Date() };

      if (patch.balance !== undefined) $set.balance = patch.balance;
      if (patch.lowBalanceThreshold !== undefined)
        $set.lowBalanceThreshold = patch.lowBalanceThreshold;
      if (patch.flags !== undefined) $set.flags = patch.flags;
      if (patch.lastLowBalanceNotification !== undefined)
        $set.lastLowBalanceNotification = patch.lastLowBalanceNotification;

      // Lógica para setOnInsert sin usar any
      const $setOnInsert: Record<string, unknown> = { createdAt: new Date() };

      // Aseguramos el campo users_id (o idField) en el upsert
      const usersIdValue =
        process.env.WALLET_USER_ID_IS_OBJECTID === 'true'
          ? new mongoose.Types.ObjectId(String(fixerId))
          : String(fixerId);

      $setOnInsert[idField] = usersIdValue;

      await db
        .collection<WalletDocument>(collectionName)
        .updateOne(query, { $set, $setOnInsert }, { upsert: true });
    },
  };
}
