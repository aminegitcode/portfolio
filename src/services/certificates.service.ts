import certificates from "@/data/certificates.json";
import type { Certificate } from "@/types";

const time = (d: string | null) => (d ? new Date(d).getTime() : 0);

export const getCertificates = async () =>
  [...(certificates as unknown as Certificate[])].sort((a, b) => time(b.issue_date) - time(a.issue_date));
