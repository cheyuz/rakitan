import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { getBlockDefinition } from '@/Blocks/registry';
import { AlertCircle, Edit3 } from 'lucide-react';

export default function Show({
    page,
    navigation = [],
    footerNavigation = [],
    recentPosts = [],
    categories = [],
    isAdmin = false,
}) {
    const blocks = Array.isArray(page.blocks) ? page.blocks : [];

    return (
        <PublicLayout
            navigation={navigation}
            footerNavigation={footerNavigation}
            layout={page.layout || 'default'}
            recentPosts={recentPosts}
            categories={categories}
            isAdmin={isAdmin}
        >
            <Head>
                <title>{page.meta_title || page.title}</title>
                {page.meta_description && (
                    <meta name="description" content={page.meta_description} />
                )}
            </Head>

            {/* Admin Draft Preview Banner */}
            {isAdmin && page.status === 'draft' && (
                <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2 text-center text-xs text-amber-400 flex items-center justify-center gap-3">
                    <div className="flex items-center gap-1.5 font-medium">
                        <AlertCircle className="w-4 h-4 text-amber-400" />
                        <span>Draft Preview Mode: This page is not yet visible to the public.</span>
                    </div>
                    <Link
                        href={`/admin/pages/${page.id}/builder`}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-amber-500 text-slate-950 font-semibold hover:bg-amber-400 transition-colors"
                    >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Open Visual Builder</span>
                    </Link>
                </div>
            )}

            {/* Dynamic Blocks Rendering Container */}
            <div className="w-full flex flex-col">
                {blocks.length === 0 ? (
                    <div className="py-32 text-center px-4">
                        <div className="w-16 h-16 rounded-2xl bg-slate-800 text-slate-400 flex items-center justify-center mx-auto mb-4">
                            <AlertCircle className="w-8 h-8" />
                        </div>
                        <h2 className="text-xl font-bold text-white mb-2">Page is Empty</h2>
                        <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
                            No puzzle blocks have been assembled on this page yet.
                        </p>
                        {isAdmin && (
                            <Link
                                href={`/admin/pages/${page.id}/builder`}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-medium text-sm hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/25"
                            >
                                <Edit3 className="w-4 h-4" />
                                <span>Start Adding Blocks</span>
                            </Link>
                        )}
                    </div>
                ) : (
                    blocks.map((block) => {
                        const def = getBlockDefinition(block.type);

                        if (!def) {
                            return (
                                <div
                                    key={block.id}
                                    className="p-6 my-4 max-w-2xl mx-auto rounded-xl border border-dashed border-red-500/30 bg-red-950/20 text-red-400 text-xs text-center"
                                >
                                    Component type <code>{block.type}</code> is not registered in BLOCK_REGISTRY.
                                </div>
                            );
                        }

                        const Component = def.Component;
                        return (
                            <div key={block.id} id={block.id} className="w-full">
                                <Component props={block.props || {}} />
                            </div>
                        );
                    })
                )}
            </div>
        </PublicLayout>
    );
}
