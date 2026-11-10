import { useState, type FormEvent } from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

/**
 * Formspree form ID: the part after /f/ in your form's endpoint,
 * e.g. https://formspree.io/f/abcdwxyz  →  'abcdwxyz'.
 * Create the form at https://formspree.io with aaronegabo@gmail.com as the
 * target email, then paste the ID here (or set VITE_FORMSPREE_FORM_ID).
 */
const FORMSPREE_FORM_ID: string = import.meta.env.VITE_FORMSPREE_FORM_ID ?? '';

const CONTACT_EMAIL = 'aaronegabo@gmail.com';

type Status = 'idle' | 'sending' | 'success' | 'error';

const inputClass =
  'bg-transparent border border-white/10 rounded-lg px-4 py-3.5 text-sm focus:outline-none focus:border-emerald-500 transition-colors text-emerald-50 placeholder:text-emerald-50/20';
const labelClass = 'text-[10px] tracking-[0.15em] uppercase text-white/60 font-medium';

const ContactForm = () => {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (!FORMSPREE_FORM_ID) {
      setStatus('error');
      setError(`The form isn't connected yet. Please email me directly at ${CONTACT_EMAIL}.`);
      return;
    }

    const data = new FormData(form);
    const name = `${data.get('firstName') ?? ''} ${data.get('lastName') ?? ''}`.trim();
    data.set('_subject', `Portfolio enquiry from ${name || 'a visitor'}`);

    setStatus('sending');
    setError('');
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        form.reset();
        setStatus('success');
        return;
      }
      const body = await res.json().catch(() => null) as { errors?: { message: string }[] } | null;
      setError(body?.errors?.map(er => er.message).join(', ') || 'Something went wrong. Please try again.');
      setStatus('error');
    } catch {
      setError(`Couldn't reach the server. Check your connection, or email me at ${CONTACT_EMAIL}.`);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="liquid-glass rounded-[1.5rem] p-10 flex flex-col items-center text-center gap-4" role="status">
        <CheckCircle2 className="w-10 h-10 text-emerald-400" />
        <h3 className="text-3xl font-heading italic">Message sent</h3>
        <p className="text-sm text-white/60 max-w-sm leading-relaxed">
          Thanks for reaching out. Your message is in my inbox and I'll reply within 24 hours.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="text-xs text-white/50 hover:text-white underline underline-offset-4 transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-3">
          <label htmlFor="cf-first" className={labelClass}>First Name</label>
          <input id="cf-first" name="firstName" type="text" required autoComplete="given-name" placeholder="Your first name" className={inputClass} />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="cf-last" className={labelClass}>Last Name</label>
          <input id="cf-last" name="lastName" type="text" autoComplete="family-name" placeholder="Your last name" className={inputClass} />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <label htmlFor="cf-email" className={labelClass}>Email Address</label>
        <input id="cf-email" name="email" type="email" required autoComplete="email" placeholder="your@email.com" className={inputClass} />
      </div>

      <div className="flex flex-col gap-3">
        <label htmlFor="cf-interest" className={labelClass}>I'm Interested In</label>
        <div className="relative">
          <select id="cf-interest" name="interest" defaultValue="" className={`w-full appearance-none ${inputClass} text-emerald-50/80`}>
            <option value="" disabled className="bg-[#0a0014]">Select an option</option>
            <option className="bg-[#0a0014]">Hiring / Job Opportunity</option>
            <option className="bg-[#0a0014]">Full-Stack Web Development</option>
            <option className="bg-[#0a0014]">Systems Architecture</option>
            <option className="bg-[#0a0014]">Agentic AI Integration</option>
            <option className="bg-[#0a0014]">Technical Consultation</option>
            <option className="bg-[#0a0014]">Something else</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/40">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <label htmlFor="cf-message" className={labelClass}>Tell Me About Your Vision</label>
        <textarea id="cf-message" name="message" required rows={5} placeholder="Describe the role, project, or problem you want to solve..." className={`${inputClass} text-white placeholder:text-white/20 resize-none`} />
      </div>

      {/* Spam trap: humans never see or fill this */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      {status === 'error' && (
        <p role="alert" className="text-sm text-rose-300 bg-rose-500/10 border border-rose-500/20 rounded-lg px-4 py-3">
          {error}
        </p>
      )}

      <div className="flex flex-col items-center mt-4">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="liquid-glass rounded-full px-10 py-4 text-[10px] tracking-[0.2em] font-medium uppercase hover:bg-white/10 transition-all duration-300 flex items-center gap-2 mb-6 w-full md:w-auto justify-center border border-white/10 hover:border-emerald-500/50 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] text-white/80 hover:text-white disabled:opacity-60 disabled:cursor-wait"
        >
          {status === 'sending' ? 'Sending…' : <>Send My Request <ArrowUpRight className="w-4 h-4" /></>}
        </button>
        <span className="text-xs text-white/40 font-light">I'll reply within 24 hours.</span>
      </div>
    </form>
  );
};

export default ContactForm;
