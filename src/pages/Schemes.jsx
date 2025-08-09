import React from 'react';
import HealthSchemes from '@/components/HealthSchemes';
import { Helmet } from 'react-helmet-async';

const Schemes = () => {
  return (
    <main>
      <Helmet>
        <title>Health Schemes | RMNCHA Health Assistant</title>
        <meta name="description" content="Explore Indian government health schemes for mothers, children, and adolescents with benefits and eligibility details." />
        <link rel="canonical" href="/schemes" />
      </Helmet>
      <section className="py-10">
        <div className="container mx-auto px-4">
          <h1 className="sr-only">Government Health Schemes</h1>
        </div>
      </section>
      <HealthSchemes />
    </main>
  );
};

export default Schemes;
