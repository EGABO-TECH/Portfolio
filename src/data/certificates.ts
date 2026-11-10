/**
 * Certificates shown on the bookshelf.
 *
 * To add one:
 *   1. Put the certificate image in  public/certificates/
 *      (PNG, JPG or WebP. Export PDFs as an image first.)
 *   2. Add an entry below. Order here = order on the shelf.
 *
 * Example:
 * {
 *   id: 'aws-cloud-practitioner',
 *   title: 'AWS Certified Cloud Practitioner',
 *   issuer: 'Amazon Web Services',
 *   date: 'March 2026',
 *   image: '/certificates/aws-cloud-practitioner.png',
 *   description: 'What the course covered, and what I took from it.',
 *   skills: ['Cloud', 'AWS', 'Security'],
 *   credentialUrl: 'https://www.credly.com/badges/...',
 *   color: '#232f3e',
 * },
 */

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  /** Shown as written, e.g. "March 2026". */
  date: string;
  /** Path to the image in /public, e.g. "/certificates/aws.png". */
  image: string;
  /** What it covered and what you took from it. Shown when the book is opened. */
  description: string;
  skills?: string[];
  /** Link where someone can verify the certificate. */
  credentialUrl?: string;
  /** Spine colour. A colour is picked automatically if left out. */
  color?: string;
}

export const CERTIFICATES: Certificate[] = [];
