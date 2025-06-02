export interface ProjectTreeNode {
    projectName: string;
    trains: {
      trainName: string;
      jobNumbers: string[];
    }[];
    meta?: {
      isMyContract: boolean;
      isFavourite: boolean;
    };
  }
  
  