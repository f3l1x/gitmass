// ===============================================
// SHARED ========================================
// ===============================================

interface Structure {
  [key: string]: any
}

interface Composer {
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

// ===============================================
// DATA ==========================================
// ===============================================

interface DataOrg {
  name: string,
  webalize: string,
  description: string,
  id: number,
}

interface DataRepo {
  archived: boolean,
  full_name: string,
  clone_url: string,
  name: string,
  owner: {
    login: string,
  }
}

// ===============================================
// HTTP ==========================================
// ===============================================

interface GithubOrg {
  name: string,
  description: string,
  id: number,
  login: string,
}

interface GithubMember {
  login: string,
  avatar_url: string,
}

interface GithubRepo {
}

// ===============================================
// UTILS =========================================
// ===============================================

interface IteratorCallback {
  (node: IteratorNode): Promise<void>;
}

interface IteratorNode {
  repo: DataRepo,
  path: string,
  exists: boolean,
  composer?: Composer
}
