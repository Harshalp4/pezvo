import type {MetadataRoute} from "next";
import {site} from "@/lib/site";
export default function robots():MetadataRoute.Robots{return {rules:process.env.NEXT_PUBLIC_SITE_URL?{userAgent:"*",allow:"/",disallow:["/api/"]}:{userAgent:"*",disallow:"/"},sitemap:`${site.url}/sitemap.xml`};}
