import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { AiOutlineDown } from 'react-icons/ai'

export default function FAQ() {
  return (
    <div style={{ maxWidth: '1200px', margin: '50px auto' }} className='FaqContainer' >
      <h1 style={{ color: '#252e69' }}  >FREQUENTLY ASKED QUESTIONS</h1>
      <Accordion TransitionProps={{ unmountOnExit: true }} className='FaqAccordion'  >
        <AccordionSummary
          expandIcon={<AiOutlineDown />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant='h6' style={{ color: '#252e69', fontWeight:'700', fontSize:'17px' }}   >How many videos can I download at a time?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className='AccordionText'  >
            You can put up to 100 links, but our suggestion is to add and download 10 links at a time. This will give you the best experience possible in terms of download speed and wait time.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion TransitionProps={{ unmountOnExit: true }} className='FaqAccordion'  >
        <AccordionSummary
          expandIcon={<AiOutlineDown />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography variant='h6' style={{ color: '#252e69', fontWeight:'700', fontSize:'17px' }}  >How long does it take to download more than 1 video at a time?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className='AccordionText'  >
            This depends on the speed of your internet, the amount of videos you’re downloading, and the size of the video files / length of video. Being that there’s a variety of variables at play, it usually takes up to 30secs for 10 videos, and 10secs for 10 cover images.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion TransitionProps={{ unmountOnExit: true }} className='FaqAccordion'  >
        <AccordionSummary
          expandIcon={<AiOutlineDown />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography variant='h6' style={{ color: '#252e69', fontWeight:'700', fontSize:'17px' }}  >How do I open files when I mass download?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className='AccordionText'  >
            When you download multiple videos & cover images at the same time, TOKdownload will automatically download a Zip File with everything inside of it. ALl you simply need to do is “Extract” the files and or drag and drop them onto your desktop.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion  className='FaqAccordion'  >
        <AccordionSummary
          expandIcon={<AiOutlineDown />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography variant='h6' style={{ color: '#252e69', fontWeight:'700', fontSize:'17px' }}  >Can TOKdownload save videos from personal / private TikTok accounts?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className='AccordionText'  >
            Unfortunately we are unable to download TikTok videos & Cover images for accounts that are private and or videos that are private. Our TikTok video saver cannot access the content of private accounts and cannot save videos from there. You must make sure the account is public in order for us to save videos for you.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion TransitionProps={{ unmountOnExit: true }} className='FaqAccordion'  >
        <AccordionSummary
          expandIcon={<AiOutlineDown />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography variant='h6' style={{ color: '#252e69', fontWeight:'700', fontSize:'17px' }}  >Where are TikTok videos saved after downloading?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className='AccordionText'  >
            When you save your TikTok videos & Cover Images, the files are usually saved to the default location you selected. In your browser settings you can change the destination folder to anywhere you would like. Typically they are saved in the “Downloads” folder.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion TransitionProps={{ unmountOnExit: true }} className='FaqAccordion'  >
        <AccordionSummary
          expandIcon={<AiOutlineDown />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography variant='h6' style={{ color: '#252e69', fontWeight:'700', fontSize:'17px' }}  >Do I need to have a TikTok account to download TikTok videos?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className='AccordionText'  >
            No, you do not need to have a TikTok  account in order to download the TikTok Videos & Cover Images. All you need is a TikTok link and that’s it!
            Just paste your TikTok link into the input field at the top of the page and click "Download". TOKdownload will do all the work for you! And have your video(s) available WITHOUT any watermarks in just a few seconds!

          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion TransitionProps={{ unmountOnExit: true }} className='FaqAccordion'  >
        <AccordionSummary
          expandIcon={<AiOutlineDown />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography variant='h6' style={{ color: '#252e69', fontWeight:'700', fontSize:'17px' }}  >Do I need to be logged into a TikTok account to download TikTok videos?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className='AccordionText'  >
            Nope! You can use TOKdownload to download TikTok Videos & Cover Images in bulk without even needing to log-in to a TikTok account. Making it super simple and easy to use anywhere at any time.          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion TransitionProps={{ unmountOnExit: true }} className='FaqAccordion'  >
        <AccordionSummary
          expandIcon={<AiOutlineDown />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography variant='h6' style={{ color: '#252e69', fontWeight:'700', fontSize:'17px' }}  >Do I need to install extensions to use TikTok downloader?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className='AccordionText'  >
            Nope. To save TikTok videos and Cover Images, you just need to add the link to the TikTok video, paste it into the input field, and download your content!
            We do suggest checking out our other tools and extensions !
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion TransitionProps={{ unmountOnExit: true }} className='FaqAccordion'  >
        <AccordionSummary
          expandIcon={<AiOutlineDown />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography variant='h6' style={{ color: '#252e69', fontWeight:'700', fontSize:'17px' }}  >How do I get the link to download TikTok videos?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className='AccordionText'  >
            On Mobile:
            Click the “Share” on any video and click “Copy Link”. Once copied, paste it into TOKdownload and that’s it!

            On Desktop:
            Go to the video you want to download, copy the URL at the top, and paste it into TOKdownload. That’s it!          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion TransitionProps={{ unmountOnExit: true }} className='FaqAccordion'  >
        <AccordionSummary
          expandIcon={<AiOutlineDown />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography variant='h6' style={{ color: '#252e69', fontWeight:'700', fontSize:'17px' }}  >Do I have to pay to download TikTok video?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className='AccordionText'  >
            Nope. This is 100% free. We highly encourage you to check out our other Tools & extensions for even faster TIkTok Growth. TOKdownloads supports all modern browsers such as Google Chrome, Mozilla Firefox, Safari, Microsoft Edge etc.          </Typography>
        </AccordionDetails>
      </Accordion>


    </div>
  );
}