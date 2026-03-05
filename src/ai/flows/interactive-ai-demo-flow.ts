'use server';
/**
 * @fileOverview This flow provides an interactive AI demo, allowing users to test a limited AI solution directly within a project case study.
 *
 * - interactiveAIDemo - A function that handles the interactive AI demo process.
 * - InteractiveAIDemoInput - The input type for the interactiveAIDemo function.
 * - InteractiveAIDemoOutput - The return type for the interactiveAIDemo function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InteractiveAIDemoInputSchema = z.object({
  userQuery: z
    .string()
    .describe(
      'The user input or query for the AI demo. This will be processed by the AI.'
    ),
});
export type InteractiveAIDemoInput = z.infer<typeof InteractiveAIDemoInputSchema>;

const InteractiveAIDemoOutputSchema = z.object({
  aiResponse: z.string().describe('The AI generated response to the user query.'),
});
export type InteractiveAIDemoOutput = z.infer<typeof InteractiveAIDemoOutputSchema>;

export async function interactiveAIDemo(
  input: InteractiveAIDemoInput
): Promise<InteractiveAIDemoOutput> {
  return interactiveAIDemoFlow(input);
}

const prompt = ai.definePrompt({
  name: 'interactiveAIDemoPrompt',
  input: {schema: InteractiveAIDemoInputSchema},
  output: {schema: InteractiveAIDemoOutputSchema},
  prompt: `You are an AI demo assistant. Your task is to provide a concise and helpful response to the user's query, showcasing a limited AI solution.
Keep your response to a maximum of 50 words and focus on providing a clear and direct answer.

User query: {{{userQuery}}}`,
});

const interactiveAIDemoFlow = ai.defineFlow(
  {
    name: 'interactiveAIDemoFlow',
    inputSchema: InteractiveAIDemoInputSchema,
    outputSchema: InteractiveAIDemoOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
