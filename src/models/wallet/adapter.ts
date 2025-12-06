import mongoose from 'mongoose';

// Definimos la interfaz del documento tal como existe en MongoDB
// Esto ayuda a que TypeScript sepa qué esperar de la DB.
interface WalletDocument {
  _id: mongoose.Types.ObjectId | string;
  wallet?: {
    balance?: number;
    lowBalanceThreshold?: number;
    flags?: Record<string, unknown>; // Reemplazo seguro para 'any'
    lastLowBalanceNotification?: Date;
    updatedAt?: Date;
  };
}

export interface WalletModelAdapter {
  getWalletById(fixerId: string): Promise<WalletSlice | null>;
  updateWalletById(fixerId: string, patch: Partial<WalletSlice>): Promise<void>;
}

export interface WalletSlice {
  balance: number;
  lowBalanceThreshold: number;
  // 'Record<string, unknown>' es la forma segura de decir "un objeto JSON cualquiera"
  flags: Record<string, unknown> | null;
  lastLowBalanceNotification: Date | null;
}

function normalizeId(raw: string): mongoose.Types.ObjectId | string {
  const s = String(raw).trim();
  return /^[0-9a-fA-F]{24}$/.test(s) ? new mongoose.Types.ObjectId(s) : s;
}

function getDb() {
  if (!mongoose.connection.db) throw new Error('Database not connected');
  return mongoose.connection.db;
}

// Wallet embebido dentro de la colección de usuarios (campo wallet.*)
export function makeRawCollectionWalletAdapter(collectionName: string): WalletModelAdapter {
  /*interface RawWalletSubDoc {
    balance?: number;
    lowBalanceThreshold?: number;
    flags?: unknown;
    lastLowBalanceNotification?: Date | null;
  }

  interface RawWalletDoc {
    _id: mongoose.Types.ObjectId | string;
    wallet?: RawWalletSubDoc;
  }
  interface RawWalletUpdateSet {
    'wallet.updatedAt': Date;
    'wallet.balance'?: number;
    'wallet.lowBalanceThreshold'?: number;
    'wallet.flags'?: unknown;
    'wallet.lastLowBalanceNotification'?: Date | null;
  } */
  return {
    async getWalletById(fixerId: string): Promise<WalletSlice | null> {
      const _id = normalizeId(fixerId);
      const db = getDb();

      // Usamos el genérico <WalletDocument> para que findOne sepa qué devuelve
      const doc = await db.collection<WalletDocument>(collectionName).findOne(
        { _id }, // TypeScript ya entiende que esto es un filtro válido
        {
          projection: {
            'wallet.balance': 1,
            'wallet.lowBalanceThreshold': 1,
            'wallet.flags': 1,
            'wallet.lastLowBalanceNotification': 1,
          },
        },
      );

      if (!doc?.wallet) return null;

      return {
        balance: Number(doc.wallet.balance ?? 0),
        lowBalanceThreshold: Number(doc.wallet.lowBalanceThreshold ?? 0),
        flags: doc.wallet.flags ?? null,
        lastLowBalanceNotification: doc.wallet.lastLowBalanceNotification ?? null,
      };
    },
    async updateWalletById(fixerId: string, patch: Partial<WalletSlice>): Promise<void> {
      const _id = normalizeId(fixerId);
      const db = getDb();

      // En lugar de 'any', usamos Record<string, unknown> para permitir claves dinámicas
      const $set: Record<string, unknown> = {
        'wallet.updatedAt': new Date(),
      };

      if (patch.balance !== undefined) {
        $set['wallet.balance'] = patch.balance;
      }
      if (patch.lowBalanceThreshold !== undefined) {
        $set['wallet.lowBalanceThreshold'] = patch.lowBalanceThreshold;
      }
      if (patch.flags !== undefined) {
        $set['wallet.flags'] = patch.flags;
      }
      if (patch.lastLowBalanceNotification !== undefined) {
        $set['wallet.lastLowBalanceNotification'] = patch.lastLowBalanceNotification;
      }

      await db.collection<WalletDocument>(collectionName).updateOne({ _id }, { $set });
    },
  };
}
