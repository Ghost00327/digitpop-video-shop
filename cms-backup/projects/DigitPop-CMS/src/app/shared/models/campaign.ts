import { Project } from './project';

export class Campaign {
  _id: string;
  name: string;
  description: string;
  project: Project;
  category: string;
  budgetType: string;
  budgetAmount: string;
  spentAmount: string;
  startDate: Date;
  endDate: Date;
  audienceId: string;
  verificationQuestion: string;
  verificationAnswer: string;
  verificationWrongAnswer1: string;
  verificationWrongAnswer2: string;
  verificationWrongAnswer3: string;
  verificationWrongAnswer4: string;
  notes: string;
  stats: {
	engagementCount: { type: Number, default: 0 },
	watchCount: { type: Number, default: 0 },
	videoClickCount : { type: Number, default: 0 },
	videoWatchCount: { type: Number, default: 0 },
	videoPauseCount: { type: Number, default: 0 },
	buyNowClickCount: { type: Number, default: 0 },
	productCount: { type: Number, default: 0},
	wrongAnswerCount: { type: Number, default: 0},
	completionCount: { type: Number, default: 0 }
  };
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;

  constructor() {}
}

