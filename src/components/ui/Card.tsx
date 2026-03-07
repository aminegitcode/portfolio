import React from 'react'
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/utils/utils";
type CardProps = {

  className?: string;
  index?:number;
  children: React.ReactNode;
}

function Card({children,className,index=0}: CardProps) {
  return (
    <motion.div
           
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={cn(

                  "border z-1 bg-background hover-glow border-primary/20 hover:border-primary/40   hover:cursor-pointer p-5  rounded-2xl transition-all duration-300",
                  className
              )}
              
            >
                {children}
            </motion.div>
      
    
  )
}

export default Card
