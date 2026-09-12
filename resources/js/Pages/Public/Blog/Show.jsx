import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import DOMPurify from 'dompurify';
import { Calendar, User, Eye, ArrowLeft, ArrowRight, Share2, AlertCircle, Edit3, BookOpen } from 'lucide-react';

export default function Show({
    post,
    relatedPosts = [],
    categories = [],
    recentPosts = [],
    navigation = [],
    footerNavigation = [],
    isAdmin = false,
}) {
    // Sanitize markdown / HTML content
    const sanitizedHtml = DOMPurify.sanitize(post.content || '', {
        USE_PROFILES: { html: true },
    });

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: post.title,
                url: window.location.href,
            }).catch(() => {});
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Article URL copied to clipboard!');
        }
    };

    return (
        <PublicLayout
            navigation={navigation}
            footerNavigation={footerNavigation}
            layout={post.layout || 'default'}
            recentPosts={recentPosts}
            categories={categories}
            isAdmin={isAdmin}
        >
            <Head>
                <title>{`${post.title} - Rakitan Blog`}</title>
                {post.excerpt && <meta name="description" content={post.excerpt} />}
            </Head>

            {/* Admin Draft Banner */}
            {isAdmin && post.status === 'draft' && (
                <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2.5 text-center text-xs text-amber-400 flex items-center justify-center gap-3">
                    <div className="flex items-center gap-1.5 font-medium">
                        <AlertCircle className="w-4 h-4 text-amber-400" />
                        <span>Draft Preview Mode: This post is not yet published to the public.</span>
                    </div>
                    <Link
                        href={`/admin/posts/${post.id}/edit`}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-amber-500 text-slate-950 font-semibold hover:bg-amber-400 transition-colors"
                    >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit Post</span>
                    </Link>
                </div>
            )}

            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
                {/* Back to Blog & Breadcrumb */}
                <div className="flex items-center justify-between gap-4 mb-8">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors group"
                    >
                        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                        <span>Back to All Articles</span>
                    </Link>

                    {post.category && (
                        <Link
                            href={`/blog?category=${post.category.slug}`}
                            className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 hover:bg-indigo-500/20 transition-all"
                        >
                            {post.category.name}
                        </Link>
                    )}
                </div>

                {/* Article Header */}
                <header className="mb-10 text-center sm:text-left">
                    <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-6">
                        {post.title}
                    </h1>

                    {post.excerpt && (
                        <p className="text-base sm:text-xl text-slate-300 leading-relaxed mb-6 font-light">
                            {post.excerpt}
                        </p>
                    )}

                    {/* Metadata & Share */}
                    <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-slate-800/80 text-xs text-slate-400">
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-full bg-indigo-600/30 text-indigo-400 flex items-center justify-center font-bold text-xs">
                                    {post.author ? post.author.charAt(0).toUpperCase() : 'A'}
                                </div>
                                <span className="font-semibold text-slate-200">{post.author}</span>
                            </div>

                            <span>•</span>

                            <div className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                                <span>{post.published_at}</span>
                            </div>

                            <span>•</span>

                            <div className="flex items-center gap-1.5">
                                <Eye className="w-3.5 h-3.5 text-slate-500" />
                                <span>{post.views_count} views</span>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={handleShare}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-white transition-all text-xs font-medium"
                        >
                            <Share2 className="w-3.5 h-3.5" />
                            <span>Share</span>
                        </button>
                    </div>
                </header>

                {/* Featured Image */}
                {post.featured_image && (
                    <div className="mb-12 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl shadow-slate-950/60 aspect-[16/9] bg-slate-950">
                        <img
                            src={post.featured_image}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                {/* Main Content Body */}
                <div
                    className="prose prose-invert prose-indigo max-w-none text-slate-300 leading-relaxed text-base sm:text-lg
                        prose-headings:font-bold prose-headings:text-white prose-headings:tracking-tight
                        prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4
                        prose-h3:text-xl sm:prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
                        prose-p:mb-6 prose-p:leading-relaxed
                        prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
                        prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6
                        prose-li:mb-2
                        prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-800 prose-pre:rounded-2xl
                        prose-code:text-indigo-300 prose-code:bg-slate-900 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-lg prose-code:text-sm
                        prose-blockquote:border-l-4 prose-blockquote:border-indigo-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-slate-400"
                    dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
                />

                {/* Related Articles */}
                {relatedPosts && relatedPosts.length > 0 && (
                    <div className="mt-20 pt-12 border-t border-slate-800/80">
                        <div className="flex items-center gap-2 mb-8">
                            <BookOpen className="w-5 h-5 text-indigo-400" />
                            <h3 className="text-xl font-bold text-white tracking-tight">Related Articles</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedPosts.map((rel) => (
                                <Link
                                    key={rel.id}
                                    href={`/blog/${rel.slug}`}
                                    className="group block p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:bg-slate-900/80 hover:border-slate-700 transition-all"
                                >
                                    {rel.featured_image && (
                                        <img
                                            src={rel.featured_image}
                                            alt={rel.title}
                                            className="w-full aspect-[16/10] object-cover rounded-xl mb-3 border border-slate-800 group-hover:opacity-90"
                                        />
                                    )}
                                    <h4 className="text-sm font-semibold text-white group-hover:text-indigo-400 transition-colors line-clamp-2 mb-1">
                                        {rel.title}
                                    </h4>
                                    <p className="text-[11px] text-slate-500 flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        <span>{rel.published_at}</span>
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </article>
        </PublicLayout>
    );
}
