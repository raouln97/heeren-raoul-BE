import { clueData, anniGameClueData, anniversaryClues } from './clue';
import { checkAnswerDTO } from './genericFunctions.dto';

export class GenericFunctionsService {
  async getClueData(clueId: number, type?: string) {
    let data: { answer: string; clue: string };
    if (type === 'anniGame') {
      data = anniGameClueData[clueId - 1];
    } else if (type === 'anniClue') {
      data = anniversaryClues[clueId - 1];
    } else {
      data = clueData[clueId - 1];
    }
    const answer = data.answer.replace(/\s+/g, '');

    console.log(answer);

    return { clue: data.clue, answerLength: answer.length };
  }

  async checkAnswer(body: checkAnswerDTO) {
    const { answer, clueId, type } = body;
    let data: { answer: string; clue: string };
    if (type === 'anniGame') {
      data = anniGameClueData[clueId - 1];
    } else if (type === 'anniClue') {
      data = anniversaryClues[clueId - 1];
    } else {
      data = clueData[clueId - 1];
    }

    const formattedClueAnswer = data.answer.replace(/\s+/g, '');

    return answer.toLowerCase() === formattedClueAnswer.toLowerCase();
  }
}
