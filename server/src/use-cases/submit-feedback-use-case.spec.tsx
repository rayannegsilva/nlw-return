import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

const createFeedbackSpy = jest.fn();
const sendEmailSpy = jest.fn();
const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy},
  { sendMail: sendEmailSpy}
)

describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => {

    await expect(submitFeedback.execute({
      type: 'BUG',
      comment:'example comment',
      screenshot: 'data:image/png;base64,sfdsdwewefwefsdfd',
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendEmailSpy).toHaveBeenCalled();
  });

  it('should not be able to submit feedback without type', async () => {
    await expect(submitFeedback.execute({
      type: '',
      comment:'example comment',
      screenshot: 'data:image/png;base64,sfdsdwewefwefsdfd',
    })).rejects.toThrow();
  });


  it('should not be able to submit feedback without comment', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment:'',
      screenshot: 'data:image/png;base64,sfdsdwewefwefsdfd',
    })).rejects.toThrow();
  });

  it('should not be able to submit feedback without invalid screenshot', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment:'Ta tudo bugado',
      screenshot: 'test.jpg',
    })).rejects.toThrow();
  });

});