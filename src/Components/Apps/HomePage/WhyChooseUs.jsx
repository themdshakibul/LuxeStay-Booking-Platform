"use client";

import React from 'react';
import { Card, CardBody } from '@nextui-org/react';
import { MdVerifiedUser, MdSecurity, MdPayment, MdHeadsetMic } from 'react-icons/md';
import { motion } from 'framer-motion';

export default function WhyChooseUs() {
  const benefits = [
    {
      icon: <MdVerifiedUser size={36} className="text-emerald-400" />,
      title: "100% Verified Properties",
      description: "Every property goes through a rigorous manual review process by our administration team before it is listed."
    },
    {
      icon: <MdSecurity size={36} className="text-violet-400" />,
      title: "Secure Session Controls",
      description: "Our platform uses state of the art JWT token headers and role validation, securing all API paths and user profile routes."
    },
    {
      icon: <MdPayment size={36} className="text-indigo-400" />,
      title: "Stripe Payment Gateway",
      description: "Transactions and deposits are processed securely using Stripe Checkout elements, immediately logging audits."
    },
    {
      icon: <MdHeadsetMic size={36} className="text-pink-400" />,
      title: "24/7 Agent Support",
      description: "Our support agents and hosts are available round-the-clock to coordinate check-in details and handle bookings."
    }
  ];

  return (
    <section className="py-20 px-6 bg-slate-950 border-t border-b border-slate-900">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-widest text-violet-500 font-extrabold"
          >
            Our Core Values
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold mt-2 text-white tracking-tight"
          >
            Why Choose LuxeStay
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="h-1 bg-violet-600 mx-auto mt-4 rounded-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
            >
              <Card className="h-full bg-slate-900/50 border border-slate-800 backdrop-blur-sm shadow-md">
                <CardBody className="p-8 flex flex-col gap-4 text-center items-center">
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-850 shadow-inner flex items-center justify-center">
                    {benefit.icon}
                  </div>
                  <h3 className="font-bold text-lg text-white mt-2">
                    {benefit.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
