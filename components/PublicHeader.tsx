import Link from "next/link";
export function PublicHeader() { return <header className="site-header"><div className="wrap nav"><Link href="/" className="logo"><span className="mark">SHH</span><span>雙和醫訊</span></Link><nav aria-label="主要導覽"><Link href="/issues">歷期醫訊</Link></nav></div></header>; }
