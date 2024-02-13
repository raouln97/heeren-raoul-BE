import { clueData } from './clue';

export class GenericFunctionsService {
  async getClueData(clueId: number) {
    const data = clueData[clueId - 1];
    const answer = data.answer.replace(/\s+/g, '');

    console.log(answer);

    return { clue: data.clue, answerLength: answer.length };
  }
}
