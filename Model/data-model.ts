// import mongoose, { Document } from 'mongoose';

// export interface gameInformationDto extends Document {
//   logo: string;
//   cluesInformation: {
//     clue: string;
//     answer: string;
//   }[];
//   projectName: string;
//   song: string;
// }

// const gameInformationSchema = new mongoose.Schema<gameInformationDto>({
//   projectName: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   logo: {
//     type: String, // assuming the logo is stored as a URL or file path
//   },
//   song: {
//     type: String, // assuming the song is stored as a URL or file path
//   },
//   cluesInformation: [
//     {
//       clue: { type: String, required: true },
//       answer: { type: String, required: true },
//     },
//   ],
// });

// export const gameInformationData = mongoose.model<gameInformationDto>(
//   'gameInformationSchema',
//   gameInformationSchema
// );
