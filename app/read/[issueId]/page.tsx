import { notFound } from "next/navigation"; import { getIssue } from "@/lib/content"; import { PdfReader } from "@/components/PdfReader";
export const metadata = { robots: { index: false, follow: true } };
export default function ReadPage({params,searchParams}:{params:{issueId:string};searchParams:{page?:string}}){const issue=getIssue(params.issueId);if(!issue)notFound();const initial=Math.max(1,Number(searchParams.page)||1);return <PdfReader issue={issue} initialPage={initial}/>}
