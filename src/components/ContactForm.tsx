import { useState } from 'react';
import { AlertCircle, CheckCircle2, Copy, Mail, Send } from 'lucide-react';
import { SITE_CONFIG } from '../data/site';

interface FormErrors {
  fullName?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm({ compact = false }: { compact?: boolean }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitState, setSubmitState] = useState<'idle' | 'prepared' | 'error'>('idle');
  const [preparedMailto, setPreparedMailto] = useState('');
  const [copiedFallback, setCopiedFallback] = useState(false);

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (!fullName.trim()) {
      nextErrors.fullName = 'Please enter your full name.';
    }
    if (!email.trim()) {
      nextErrors.email = 'Please enter your email address.';
    } else if (!EMAIL_REGEX.test(email.trim())) {
      nextErrors.email = 'Please enter a valid email address (for example, name@example.com).';
    }
    if (!subject.trim()) {
      nextErrors.subject = 'Please enter a subject.';
    }
    if (!message.trim() || message.trim().length < 10) {
      nextErrors.message = 'Please enter a message of at least 10 characters.';
    }
    return nextErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    setCopiedFallback(false);

    if (Object.keys(validationErrors).length > 0) {
      setSubmitState('error');
      return;
    }

    const emailSubject = `[TooloraHub] ${subject.trim()}`;
    const emailBody = [
      `Name: ${fullName.trim()}`,
      `Reply-To Email: ${email.trim()}`,
      '',
      message.trim(),
    ].join('\n');

    const mailtoUrl = `mailto:${SITE_CONFIG.developer.email}?subject=${encodeURIComponent(
      emailSubject
    )}&body=${encodeURIComponent(emailBody)}`;

    setPreparedMailto(mailtoUrl);
    setSubmitState('prepared');

    // Trigger user's default email client without navigating away
    const link = document.createElement('a');
    link.href = mailtoUrl;
    link.click();
  };

  const handleCopyFallback = async () => {
    const summary = `To: ${SITE_CONFIG.developer.email}\nSubject: [TooloraHub] ${subject.trim()}\nFrom: ${fullName.trim()} (${email.trim()})\n\n${message.trim()}`;
    try {
      await navigator.clipboard.writeText(summary);
      setCopiedFallback(true);
    } catch {
      setCopiedFallback(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white rounded-xl border border-[#DCE5F0] p-6 sm:p-8 space-y-5"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-full-name" className="block text-sm font-medium text-[#12345A] mb-1.5">
            Full Name <span className="text-[#C83E3B]">*</span>
          </label>
          <input
            id="contact-full-name"
            type="text"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
            }}
            placeholder="Your full name"
            required
            aria-invalid={Boolean(errors.fullName)}
            className={`w-full h-11 px-3.5 rounded-lg border text-sm text-[#10243E] bg-[#FAFBFD] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#16C6C9]/40 ${
              errors.fullName ? 'border-[#C83E3B]' : 'border-[#D4E0EE] focus:border-[#16C6C9]'
            }`}
          />
          {errors.fullName && (
            <p className="mt-1 text-xs text-[#B32D2A]">{errors.fullName}</p>
          )}
        </div>

        <div>
          <label htmlFor="contact-email" className="block text-sm font-medium text-[#12345A] mb-1.5">
            Email Address <span className="text-[#C83E3B]">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
            }}
            placeholder="you@example.com"
            required
            aria-invalid={Boolean(errors.email)}
            className={`w-full h-11 px-3.5 rounded-lg border text-sm text-[#10243E] bg-[#FAFBFD] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#16C6C9]/40 ${
              errors.email ? 'border-[#C83E3B]' : 'border-[#D4E0EE] focus:border-[#16C6C9]'
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-[#B32D2A]">{errors.email}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="contact-subject" className="block text-sm font-medium text-[#12345A] mb-1.5">
          Subject <span className="text-[#C83E3B]">*</span>
        </label>
        <input
          id="contact-subject"
          type="text"
          value={subject}
          onChange={(e) => {
            setSubject(e.target.value);
            if (errors.subject) setErrors((prev) => ({ ...prev, subject: undefined }));
          }}
          placeholder="Tool suggestion, feedback, or support question"
          required
          aria-invalid={Boolean(errors.subject)}
          className={`w-full h-11 px-3.5 rounded-lg border text-sm text-[#10243E] bg-[#FAFBFD] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#16C6C9]/40 ${
            errors.subject ? 'border-[#C83E3B]' : 'border-[#D4E0EE] focus:border-[#16C6C9]'
          }`}
        />
        {errors.subject && (
          <p className="mt-1 text-xs text-[#B32D2A]">{errors.subject}</p>
        )}
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-[#12345A] mb-1.5">
          Message <span className="text-[#C83E3B]">*</span>
        </label>
        <textarea
          id="contact-message"
          rows={compact ? 4 : 5}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
          }}
          placeholder="Write your message here..."
          required
          aria-invalid={Boolean(errors.message)}
          className={`w-full p-3.5 rounded-lg border text-sm text-[#10243E] bg-[#FAFBFD] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#16C6C9]/40 ${
            errors.message ? 'border-[#C83E3B]' : 'border-[#D4E0EE] focus:border-[#16C6C9]'
          }`}
        />
        {errors.message && (
          <p className="mt-1 text-xs text-[#B32D2A]">{errors.message}</p>
        )}
      </div>

      {submitState === 'error' && Object.keys(errors).length > 0 && (
        <div
          role="alert"
          className="flex items-start gap-2.5 p-3.5 rounded-lg bg-[#FEF2F2] border border-[#FECACA] text-sm text-[#991B1B]"
        >
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
          <span>Please fix the highlighted fields above before submitting your message.</span>
        </div>
      )}

      {submitState === 'prepared' && (
        <div
          role="status"
          className="p-4 rounded-lg bg-[#ECFDF5] border border-[#A7F3D0] text-sm text-[#065F46] space-y-2.5"
        >
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-[#059669]" aria-hidden="true" />
            <div>
              <p className="font-semibold">Your email draft has been prepared.</p>
              <p className="mt-0.5 text-xs leading-relaxed text-[#047857]">
                Because TooloraHub is a static website without a backend mail server, submitting opens your device&apos;s email app addressed to {SITE_CONFIG.developer.email}. Send the draft there to complete delivery, or copy the message below if no email client opened.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <a
              href={preparedMailto}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#065F46] text-white text-xs font-medium hover:bg-[#047857] transition-colors"
            >
              <Mail className="w-3.5 h-3.5" aria-hidden="true" />
              Open Email App Again
            </a>
            <button
              type="button"
              onClick={handleCopyFallback}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[#6EE7B7] bg-white text-[#065F46] text-xs font-medium hover:bg-[#ECFDF5] transition-colors"
            >
              <Copy className="w-3.5 h-3.5" aria-hidden="true" />
              {copiedFallback ? 'Copied Email & Message' : 'Copy Email & Message'}
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
        <p className="text-xs text-[#5B708B] leading-relaxed">
          Your message is prepared directly on your device for your email app and is not stored on a third-party server.
        </p>
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-lg bg-[#12345A] text-white text-sm font-semibold hover:bg-[#1A4678] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16C6C9]"
        >
          <Send className="w-4 h-4 text-[#16C6C9]" aria-hidden="true" />
          <span>Prepare Email Message</span>
        </button>
      </div>
    </form>
  );
}
