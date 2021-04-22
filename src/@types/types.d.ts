// ===============================================
// SHARED ========================================
// ===============================================

interface Structure {
  [key: string]: any
}

// ===============================================
// DATA ==========================================
// ===============================================

declare namespace Data {
  interface Organization {
    name: string,
    webalize: string,
    description: string,
    id: number,
  }

  interface Repository {
    archived: boolean,
    full_name: string,
    clone_url: string,
    name: string,
    owner: {
      login: string,
    }
  }
}

// ===============================================
// Vendor ========================================
// ===============================================

declare namespace Vendor {
  namespace Github {
    interface Organization {
      name: string,
      description: string,
      id: number,
      login: string,
    }

    interface Member {
      login: string,
      avatar_url: string,
    }

    interface Repository {
    }
  }
  namespace Composer {
    interface Repository {
      name: string;
      description: string;
      keywords: string[];
      type: string;
      license: string[];
      homepage: string;
      authors: {
        name: string,
        homepage: string,
      }[];
      require: {
        [key: string]: string
      };
      "require_dev": {
        [key: string]: string
      };
      extra: Structure;
    }
  }
}

// ===============================================
// UTILS =========================================
// ===============================================

declare namespace Utils {

  interface IteratorCallback {
    (node: IteratorNode): Promise<void>;
  }

  interface IteratorNode {
    repo: Data.Repository,
    path: string,
    exists: boolean,
    composer?: Vendor.Composer.Repository
  }

}
