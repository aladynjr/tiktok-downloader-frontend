import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import {AiOutlineDown} from 'react-icons/ai'

export default function FAQ() {
  return (
    <div style={{maxWidth:'1000px', margin:'50px auto'}} >
      <Accordion TransitionProps={{ unmountOnExit: true }}  className='FaqAccordion'  >
        <AccordionSummary
          expandIcon={<AiOutlineDown />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography  variant='h6' color='secondary'   >FAQ Question 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion TransitionProps={{ unmountOnExit: true }} className='FaqAccordion'  >
        <AccordionSummary
          expandIcon={<AiOutlineDown />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography variant='h6' color='secondary' >FAQ 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion TransitionProps={{ unmountOnExit: true }} className='FaqAccordion'  >
        <AccordionSummary
          expandIcon={<AiOutlineDown />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography variant='h6' color='secondary' >FAQ 3</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion TransitionProps={{ unmountOnExit: true }} className='FaqAccordion'  >
        <AccordionSummary
          expandIcon={<AiOutlineDown />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography variant='h6' color='secondary' >FAQ 4</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
 
    </div>
  );
}