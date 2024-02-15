import { clueData } from './clue';
import { checkAnswerDTO } from './genericFunctions.dto';

export class GenericFunctionsService {
  async getClueData(clueId: number) {
    const data = clueData[clueId - 1];
    const answer = data.answer.replace(/\s+/g, '');

    console.log(answer);

    return { clue: data.clue, answerLength: answer.length };
  }

  async checkAnswer(body: checkAnswerDTO) {
    const { answer, clueId } = body;
    const data = clueData[clueId - 1];

    const formattedClueAnswer = data.answer.replace(/\s+/g, '');

    return answer.toLowerCase() === formattedClueAnswer.toLowerCase();
  }
}
