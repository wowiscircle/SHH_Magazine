import Image from "next/image";
import type { Issue } from "@/lib/content";
export function Cover({ issue, small = false }: { issue: Issue; small?: boolean }) { return <div className={`cover ${small ? "cover-small" : ""}`}><Image src={issue.cover_image} alt={`${issue.year} 年 ${issue.month} 月號封面`} fill sizes={small ? "300px" : "(max-width: 760px) 84vw, 430px"} onError={undefined} /><div className="cover-placeholder"><strong>雙和醫訊</strong><span>{issue.year}.{String(issue.month).padStart(2, "0")}</span><b>封面尚待提供</b></div></div>; }
