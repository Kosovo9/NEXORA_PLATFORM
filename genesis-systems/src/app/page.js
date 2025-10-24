'use client';

import { useState } from 'react';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div style={{ 
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif', 
      color: '#e2e8f0', 
      backgroundColor: '#0b0f19', 
      lineHeight: 1.6,
      minHeight: '100vh'
    }}>
      {/* Header */}
      <header style={{
        padding: '1.25rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #1e293b',
        position: 'sticky',
        top: 0,
        backgroundColor: '#0b0f19',
        zIndex: 50
      }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f1f5f9' }}>
          Genesis<span style={{ color: '#60a5fa' }}>Systems</span>
        </div>
        <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <div style={{ display: 'none', '@media (min-width: 768px)': { display: 'flex' }, gap: '1.5rem' }}>
            {['Inicio', 'Soluciones', 'Plataforma', 'Soporte', 'Contacto'].map((item) => (
              <a key={item} href="#" style={{ textDecoration: 'none', color: '#94a5b8', fontWeight: 500, fontSize: '0.95rem', transition: 'color 0.2s' }}>
                {item}
              </a>
            ))}
          </div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              display: 'block',
              '@media (min-width: 768px)': { display: 'none' },
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: '#f1f5f9'
            }}
          >
            ☰
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div style={{
          display: 'block',
          '@media (min-width: 768px)': { display: 'none' },
          padding: '1rem 2rem',
          borderBottom: '1px solid #1e293b',
          backgroundColor: '#0f172a'
        }}>
          {['Inicio', 'Soluciones', 'Plataforma', 'Soporte', 'Contacto'].map((item) => (
            <a
              key={item}
              href="#"
              style={{
                display: 'block',
                padding: '0.75rem 0',
                textDecoration: 'none',
                color: '#cbd5e1',
                fontWeight: 500
              }}
            >
              {item}
            </a>
          ))}
        </div>
      )}

      {/* Hero */}
      <section style={{
        padding: '5rem 2rem',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #0b0f19 0%, #0f172a 100%)',
        maxWidth: '100vw'
      }}>
        <h1 style={{
          fontSize: '3.25rem',
          fontWeight: 800,
          margin: '0 0 1.5rem',
          lineHeight: 1.2,
          color: '#f1f5f9'
        }}>
          Infraestructura Digital para el Futuro Empresarial
        </h1>
        <p style={{
          fontSize: '1.2rem',
          maxWidth: '650px',
          margin: '0 auto 2.5rem',
          color: '#94a5b8'
        }}>
          Genesis Systems diseña, implementa y protege entornos tecnológicos críticos para empresas globales. Seguridad, escalabilidad y resiliencia desde el núcleo.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <button style={{
            padding: '0.75rem 2rem',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 600,
            fontSize: '1rem',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.25)'
          }}>
            Solicitar Demo
          </button>
          <button style={{
            padding: '0.75rem 2rem',
            backgroundColor: 'transparent',
            color: '#cbd5e1',
            border: '2px solid #334155',
            borderRadius: '8px',
            fontWeight: 600,
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'border-color 0.3s'
          }}>
            Documentación
          </button>
        </div>
      </section>

      {/* Soluciones */}
      <section style={{ padding: '5rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2.25rem', fontWeight: 700, marginBottom: '3rem', color: '#f1f5f9' }}>
          Nuestras Soluciones Estratégicas
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem'
        }}>
          {[
            { title: 'Ciberseguridad Avanzada', desc: 'Protección proactiva contra amenazas APT, ransomware y brechas zero-day.' },
            { title: 'Infraestructura Cloud Híbrida', desc: 'Arquitecturas multi-nube con gobernanza, cumplimiento y alta disponibilidad.' },
            { title: 'Automatización de TI', desc: 'Orquestación inteligente de redes, servidores y procesos críticos.' },
            { title: 'Soporte 24/7 Enterprise', desc: 'Equipo técnico certificado con SLA de respuesta en menos de 15 minutos.' }
          ].map((sol, i) => (
            <div key={i} style={{
              padding: '2rem',
              borderRadius: '12px',
              border: '1px solid #1e293b',
              backgroundColor: '#0f172a',
              transition: 'transform 0.2s, border-color 0.2s'
            }}>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '0.75rem', color: '#f1f5f9' }}>
                {sol.title}
              </h3>
              <p style={{ color: '#cbd5e1', fontSize: '1rem' }}>
                {sol.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Plataforma */}
      <section style={{ 
        padding: '5rem 2rem', 
        background: 'linear-gradient(to bottom, #0f172a, #0b0f19)',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 700, marginBottom: '1.5rem', color: '#f1f5f9' }}>
            Plataforma Unificada de Gestión
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#94a5b8', marginBottom: '2.5rem' }}>
            Monitoreo en tiempo real, inteligencia de amenazas, y control centralizado desde una única interfaz segura.
          </p>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            flexWrap: 'wrap',
            marginTop: '2rem'
          }}>
            {['Dashboard Inteligente', 'Gestión de Riesgos', 'Respuesta Automatizada', 'Reportes Regulatorios'].map((feature, i) => (
              <div key={i} style={{
                backgroundColor: '#1e293b',
                padding: '1rem 1.5rem',
                borderRadius: '8px',
                minWidth: '160px'
              }}>
                <div style={{ fontWeight: 600, color: '#f1f5f9' }}>{feature}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '3rem 2rem',
        backgroundColor: '#090d14',
        color: '#94a5b8',
        marginTop: '4rem',
        borderTop: '1px solid #1e293b'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem'
        }}>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: '#f1f5f9' }}>
              Genesis<span style={{ color: '#60a5fa' }}>Systems</span>
            </div>
            <p style={{ fontSize: '0.95rem' }}>
              Construyendo el futuro digital con integridad, precisión y resiliencia.
            </p>
          </div>
          <div>
            <h4 style={{ fontWeight: 600, marginBottom: '1rem', color: '#f1f5f9' }}>Empresa</h4>
            {['Sobre Nosotros', 'Carreras', 'Blog Técnico', 'Compliance'].map((item) => (
              <div key={item} style={{ marginBottom: '0.5rem' }}>
                <a href="#" style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '0.95rem' }}>
                  {item}
                </a>
              </div>
            ))}
          </div>
          <div>
            <h4 style={{ fontWeight: 600, marginBottom: '1rem', color: '#f1f5f9' }}>Contacto</h4>
            <p style={{ fontSize: '0.95rem' }}>soporte@genesissystems.io</p>
            <p style={{ fontSize: '0.95rem' }}>+1 (800) 555-0199</p>
            <p style={{ fontSize: '0.95rem' }}>Houston, TX — USA</p>
          </div>
        </div>
        <div style={{
          maxWidth: '1200px',
          margin: '2rem auto 0',
          paddingTop: '2rem',
          borderTop: '1px solid #1e293b',
          textAlign: 'center',
          fontSize: '0.9rem',
          color: '#64748b'
        }}>
          © {new Date().getFullYear()} Genesis Systems. Todos los derechos reservados. | SOC 2 Type II Certified
        </div>
      </footer>
    </div>
  );
}

