import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ExternalLink, FileText, FileImage, FileType, X } from 'lucide-react';
import './ResumeModal.css';

const EASE = [0.16, 1, 0.3, 1] as const;

type ResumeFormat = 'pdf' | 'png' | 'docx';

interface ResumeVersion {
  id: ResumeFormat;
  label: string;
  description: string;
  size: string;
  href: string;
  downloadName: string;
  Icon: typeof FileText;
}

const RESUME_VERSIONS: ResumeVersion[] = [
  {
    id: 'pdf',
    label: 'PDF Résumé',
    description: 'Best for printing and sharing',
    size: '101 KB',
    href: '/resume/Egabo_Aaron_Resume.pdf',
    downloadName: 'Egabo_Aaron_Resume.pdf',
    Icon: FileText,
  },
  {
    id: 'png',
    label: 'Image Résumé',
    description: 'Quick preview on any device',
    size: '523 KB',
    href: '/resume/Egabo_Aaron_Resume.png',
    downloadName: 'Egabo_Aaron_Resume.png',
    Icon: FileImage,
  },
  {
    id: 'docx',
    label: 'Word CV',
    description: 'Editable, ATS-friendly .docx',
    size: '41 KB',
    href: '/resume/Egabo_Aaron_CV.docx',
    downloadName: 'Egabo_Aaron_CV.docx',
    Icon: FileType,
  },
];

const isLocalHost = () =>
  typeof window !== 'undefined' &&
  /^(localhost|127\.0\.0\.1|\[::1\]|0\.0\.0\.0)$/.test(window.location.hostname);

/** Absolute URL of a public file, needed by the Office Online viewer. */
const absoluteUrl = (path: string) =>
  typeof window === 'undefined' ? path : new URL(path, window.location.origin).href;

interface ResumeModalProps {
  open: boolean;
  onClose: () => void;
}

const ResumeModal = ({ open, onClose }: ResumeModalProps) => {
  const [active, setActive] = useState<ResumeFormat>('pdf');
  const current = RESUME_VERSIONS.find(v => v.id === active)!;

  // Word files can't render in the browser; use Office Online when the site is public.
  const docxViewerUrl = useMemo(
    () =>
      isLocalHost()
        ? null
        : `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(absoluteUrl(current.href))}`,
    [current.href],
  );

  const viewUrl = current.id === 'docx' ? docxViewerUrl : current.href;

  // Esc to close + lock page scroll while open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  const renderPreview = () => {
    switch (current.id) {
      case 'pdf':
        return (
          <object data={`${current.href}#view=FitH`} type="application/pdf" className="resume-preview-frame">
            <PreviewFallback version={current} message="Your browser can't display PDFs inline." />
          </object>
        );
      case 'png':
        return (
          <div className="resume-preview-image-wrap">
            <img src={current.href} alt="Egabo Aaron résumé" className="resume-preview-image" loading="lazy" />
          </div>
        );
      case 'docx':
        return docxViewerUrl ? (
          <iframe src={docxViewerUrl} title="Egabo Aaron CV (Word)" className="resume-preview-frame" />
        ) : (
          <PreviewFallback
            version={current}
            message="Word documents can't be previewed locally. Download it to open in Word or Google Docs."
          />
        );
    }
  };

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="resume-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <motion.div
            className="resume-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="resume-modal-title"
            initial={{ y: 24, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 16, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.45, ease: EASE }}
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="resume-modal-header">
              <div>
                <p className="resume-modal-eyebrow">Résumé / CV</p>
                <h2 id="resume-modal-title" className="resume-modal-title">Choose a version</h2>
              </div>
              <button type="button" className="resume-icon-btn" onClick={onClose} aria-label="Close résumé viewer">
                <X size={18} />
              </button>
            </div>

            <div className="resume-modal-body">
              {/* Version picker */}
              <div className="resume-version-list" role="tablist" aria-label="Résumé formats">
                {RESUME_VERSIONS.map(v => (
                  <div key={v.id} className={`resume-version-card ${v.id === active ? 'is-active' : ''}`}>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={v.id === active}
                      className="resume-version-select"
                      onClick={() => setActive(v.id)}
                    >
                      <span className="resume-version-icon"><v.Icon size={18} /></span>
                      <span className="resume-version-text">
                        <span className="resume-version-label">
                          {v.label}
                          <span className="resume-version-badge">{v.id.toUpperCase()}</span>
                        </span>
                        <span className="resume-version-desc">{v.description} · {v.size}</span>
                      </span>
                    </button>
                    <a
                      href={v.href}
                      download={v.downloadName}
                      className="resume-icon-btn resume-version-download"
                      aria-label={`Download ${v.label}`}
                      title={`Download ${v.downloadName}`}
                    >
                      <Download size={16} />
                    </a>
                  </div>
                ))}
              </div>

              {/* Preview */}
              <div className="resume-preview" role="tabpanel" aria-label={`${current.label} preview`}>
                {renderPreview()}
              </div>
            </div>

            {/* Footer actions */}
            <div className="resume-modal-footer">
              <span className="resume-footer-file">{current.downloadName}</span>
              <div className="resume-footer-actions">
                {viewUrl && (
                  <a href={viewUrl} target="_blank" rel="noreferrer" className="resume-btn-ghost">
                    <ExternalLink size={14} /> Open in new tab
                  </a>
                )}
                <a href={current.href} download={current.downloadName} className="resume-btn-solid">
                  <Download size={14} /> Download {current.id.toUpperCase()}
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

const PreviewFallback = ({ version, message }: { version: ResumeVersion; message: string }) => (
  <div className="resume-preview-fallback">
    <span className="resume-version-icon resume-fallback-icon"><version.Icon size={28} /></span>
    <p>{message}</p>
    <a href={version.href} download={version.downloadName} className="resume-btn-solid">
      <Download size={14} /> Download {version.id.toUpperCase()}
    </a>
  </div>
);

export default ResumeModal;
