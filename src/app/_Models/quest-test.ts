export interface QuestTest {

    title : string;
    level ?: number;
    answer: QuestAnswer[];
}


export interface QuestAnswer {

    description : string;
    isRight : boolean;
}