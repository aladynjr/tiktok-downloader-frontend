import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import {AiOutlineDown} from 'react-icons/ai'

export default function FAQ() {
  return (
    <div style={{maxWidth:'1200px', margin:'50px auto'}} className='FaqContainer' >
        <h1 style={{color:'#252e69'}} >FREQUENTLY ASKED QUESTIONS</h1>
      <Accordion TransitionProps={{ unmountOnExit: true }}  className='FaqAccordion'  >
        <AccordionSummary
          expandIcon={<AiOutlineDown />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography  variant='h6' color='secondary'   >FAQ Question 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant='h6' style={{color:'#252e69'}} >
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
          <Typography variant='h6' color='secondary' >FAQ Question 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant='h6' style={{color:'#252e69'}} >
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
          <Typography variant='h6' color='secondary' >FAQ Question 3</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant='h6' style={{color:'#252e69'}} >
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
          <Typography variant='h6' color='secondary' >FAQ Question 4</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant='h6' style={{color:'#252e69'}} >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
 
    </div>
  );
}