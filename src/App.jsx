import './App.css'
import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Lenis from 'lenis';

function Item(props) {
  const ref = useRef(null);
  const { scrollYProgress: scrollYProgressTarget1 } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const translate = useTransform(scrollYProgressTarget1, [0, 1], ['-10%', '10%']);

  const variants = {
    hidden: { translateY: '-20%'},
    visible: { translateY: '100%'},
  };

  const imageVariants = {
    hidden: { scale: 1.35, opacity: 0.4},
    visible: { scale: 1.05, opacity: 1},
  };

  return (
    <section>
      <div>
        <motion.div
          
          className='w-[300px] h-[420px] overflow-hidden'
          initial="hidden"
          // animate="visible"
          whileInView="visible"
          viewport={{ once: true, amount:0.25 }}
          transition={{
            staggerChildren: 0.2
          }}
        >
            <motion.div
              ref={ref}
              className='w-full h-full translate-y-0 scale-x-105 scale-y-105 transition-transform ease-linear relative'
              variants={imageVariants}
 
              style={{translateY: translate, scaleX: 1.05, scaleY: 1.05}}
              transition={{
                ease: "easeInOut",
                delay: 0.1,
                duration: 0.4,
              }}
            >
              <picture>
                <img className='w-full h-full object-cover' src={props.image} />
              </picture>
              <motion.div
                className='absolute top-0 left-0 bg-white w-full h-full scale-105'
                variants={variants}
              
                
                transition={{
                  delay: 0,
                  duration: 0.8,
                }}
              >

              </motion.div>
            </motion.div>
          </motion.div>
      </div>
    </section>
  );
}

export default function App() {
  useEffect(() => {
    const lenis = new Lenis()

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }, [])
  

  return (
    <>
        <div className="title h-[80vh] flex justify-center p-6 items-center">
          <motion.h1 className='text-center text-6xl font-extrabold'
            animate={{ y: [0, 100, 0, 100, 0] }}
            transition={{
              duration: 5,
            }}
          >Image <br /> Smooth Scroll</motion.h1>
        </div>
      <div className="flex flex-col items-center justify-center gap-[10rem] mt-16 pb-24">
        <Item image="https://cdn.pixabay.com/photo/2024/03/20/06/18/ai-generated-8644732_1280.jpg" />
        <Item image="https://cdn.pixabay.com/photo/2023/02/20/20/44/ai-generated-7803073_960_720.jpg" />
        <Item image="https://cdn.pixabay.com/photo/2023/03/26/02/21/girl-7877422_1280.jpg" />
        <Item image="https://cdn.pixabay.com/photo/2023/10/14/04/27/ai-generated-8313922_1280.png" />
        <Item image="https://cdn.pixabay.com/photo/2023/12/15/11/30/sky-8450455_1280.jpg" />
        <Item image="https://cdn.pixabay.com/photo/2023/12/28/14/09/cat-8474233_1280.png" />
        <Item image="https://cdn.pixabay.com/photo/2023/10/04/17/00/ai-generated-8294107_960_720.png" />
        <Item image="https://cdn.pixabay.com/photo/2023/08/22/04/12/ai-generated-8205363_1280.jpg" />
        <Item image="https://cdn.pixabay.com/photo/2024/01/31/16/15/kitchen-8544377_1280.png" />
        <Item image="https://cdn.pixabay.com/photo/2023/10/10/12/36/lofi-8306352_1280.jpg" />
      </div>
    </>
  );
}
