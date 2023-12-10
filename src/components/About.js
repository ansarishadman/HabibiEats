import React, { useState } from 'react'
import { Outlet } from 'react-router-dom';
import { AboutSection, CareersSection, TeamSection } from './utils/description';

const Section = ({ title, visibleSection, SectionComponent, setIsVisible }) => {
  const show = !!(visibleSection === title.toLowerCase());
  return (
    <div className='border border-black p-6 m-6 bg-pink-100'>
      <div className='text-3xl pb-2 font-semibold'>{title}</div>
      <div>{show && <SectionComponent />}</div>
      <div onClick={() => setIsVisible(!!visibleSection)}
        className='cursor-pointer text-sm underline pt-2'>
        {!show ? 'Show' : ''}
      </div>
    </div>
  )
}

const About = () => {
  const [visibleSection, setVisibleSection] = useState('about');
  return (
    <div className='pt-6'>
      <Section
        title={'About'}
        visibleSection={visibleSection}
        SectionComponent={AboutSection}
        setIsVisible={() => setVisibleSection('about')} />
      <Section
        title={'Team'}
        visibleSection={visibleSection}
        SectionComponent={TeamSection}
        setIsVisible={() => setVisibleSection('team')} />
      <Section
        title={'Careers'}
        visibleSection={visibleSection}
        SectionComponent={CareersSection}
        setIsVisible={() => setVisibleSection('careers')} />
      <Outlet />
    </div>
  )
}

export default About;