import { ArrowLeft, Camera } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedbackType, feedbackTypes } from "..";
import { api } from "../../../lib/api";
import { CloseButton } from "../../CloseButton";
import { Loading } from "../../Loading";
import { ScreenShotButton } from "../ScreenShotButton";

interface FeedbackContentStepProps {
  feedbackType: FeedbackType;
  onFeedbackRestartRequested: () => void;
  onFeedbackSent: () => void;
}

export function FeedbackContentStep({ 
    feedbackType, 
    onFeedbackRestartRequested,
    onFeedbackSent
  }: FeedbackContentStepProps){
  const feedbackTypeInfo = feedbackTypes[feedbackType];
 
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState('');
  const [isSendingFeedback, setIsSendingFeedback]= useState(false);

  async function handleSubmitFeedback(event: FormEvent){
    event.preventDefault();
    // console.log({
    //   screenshot,
    //   comment
    // })
    setIsSendingFeedback(true);

   await api.post('/feedbacks', {
      type: feedbackType,
      comment,
      screenshot,
    })

    setIsSendingFeedback(false);
    onFeedbackSent();
  }


  return (
    <>
      <header>
        <button 
          type="button"
          onClick={onFeedbackRestartRequested} 
          className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100">
          <ArrowLeft className="w-4 h-4" weight="bold"/>
        </button>
          <span className='text-xl leading-6 flex items-center gap-2'>
             <img className='w-6 h-6' src={feedbackTypeInfo.image.source} alt={feedbackTypeInfo.image.alt} /> 
            {feedbackTypeInfo.title}
          </span>

          <CloseButton />
        </header>

        <div className='flex py-8 gap-2 w-full'>
           <form onSubmit={handleSubmitFeedback} className='my-4 w-full'>
             <textarea
              onChange={event => setComment(event.target.value)}
              className='min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin'
              placeholder='Conte com detalhes o que está acontecendo...' 
              />

              <footer className='flex gap-2 mt-2'>
                
                <ScreenShotButton
                  screenshot={screenshot}
                  onScreenShotTook={setScreenshot}
                />
                
                <button
                  disabled={comment.length === 0 || isSendingFeedback}
                  type='submit'
                  className='p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500'
                >
                 { isSendingFeedback ? <Loading /> : 'Enviar Feedback'}
                </button>
              </footer>
           </form>
       </div>
    </>
  );
}