/**
 * blockConverter.js
 * Helper untuk mengonversi blok standar / bawaan menjadi mode Custom (Full Editable)
 * dengan memecah elemen-elemen bawaan menjadi sub-komponen yang independen.
 */

export function convertBlockToCustom(block, deleteElementKey = null) {
    if (!block) return block;

    const type = block.type;
    const props = block.props || {};
    const existingSubs = Array.isArray(props.subComponents) ? [...props.subComponents] : [];

    let generatedSubs = [];
    const timestamp = Date.now().toString(36);

    switch (type) {
        case 'hero': {
            // 1. Badge Text
            if (deleteElementKey !== 'badge' && deleteElementKey !== 'badgeText' && props.badgeText) {
                generatedSubs.push({
                    id: `sub-badge-${timestamp}-1`,
                    type: 'sub_badge',
                    props: {
                        text: props.badgeText,
                        variant: 'primary',
                    },
                });
            }

            // 2. Main Title / Headline
            if (deleteElementKey !== 'title' && props.title) {
                generatedSubs.push({
                    id: `sub-text-${timestamp}-2`,
                    type: 'sub_text',
                    props: {
                        text: props.title,
                        variant: 'h1',
                        align: props.alignment || 'center',
                        color: 'default',
                    },
                });
            }

            // 3. Subtitle / Description
            if (deleteElementKey !== 'subtitle' && props.subtitle) {
                generatedSubs.push({
                    id: `sub-text-${timestamp}-3`,
                    type: 'sub_text',
                    props: {
                        text: props.subtitle,
                        variant: 'lead',
                        align: props.alignment || 'center',
                        color: 'muted',
                    },
                });
            }

            // 4. Action Buttons
            const hasPrimary = Boolean(props.primaryButtonText);
            const hasSecondary = Boolean(props.secondaryButtonText);

            if (deleteElementKey !== 'buttons' && (hasPrimary || hasSecondary)) {
                if (hasPrimary && hasSecondary) {
                    generatedSubs.push({
                        id: `sub-row-${timestamp}-4`,
                        type: 'sub_row',
                        props: {
                            columns: 2,
                            gap: 'md',
                            columnSlots: [
                                [
                                    {
                                        id: `sub-btn-${timestamp}-5`,
                                        type: 'sub_button',
                                        props: {
                                            text: props.primaryButtonText,
                                            url: props.primaryButtonUrl || '#',
                                            variant: 'primary',
                                            size: 'md',
                                        },
                                    },
                                ],
                                [
                                    {
                                        id: `sub-btn-${timestamp}-6`,
                                        type: 'sub_button',
                                        props: {
                                            text: props.secondaryButtonText,
                                            url: props.secondaryButtonUrl || '#',
                                            variant: 'secondary',
                                            size: 'md',
                                        },
                                    },
                                ],
                            ],
                        },
                    });
                } else if (hasPrimary) {
                    generatedSubs.push({
                        id: `sub-btn-${timestamp}-5`,
                        type: 'sub_button',
                        props: {
                            text: props.primaryButtonText,
                            url: props.primaryButtonUrl || '#',
                            variant: 'primary',
                            size: 'md',
                        },
                    });
                } else if (hasSecondary) {
                    generatedSubs.push({
                        id: `sub-btn-${timestamp}-6`,
                        type: 'sub_button',
                        props: {
                            text: props.secondaryButtonText,
                            url: props.secondaryButtonUrl || '#',
                            variant: 'secondary',
                            size: 'md',
                        },
                    });
                }
            }
            break;
        }

        case 'cta': {
            // 1. Title
            if (deleteElementKey !== 'title' && props.title) {
                generatedSubs.push({
                    id: `sub-text-${timestamp}-1`,
                    type: 'sub_text',
                    props: {
                        text: props.title,
                        variant: 'h2',
                        align: 'center',
                        color: 'default',
                    },
                });
            }

            // 2. Description
            if (deleteElementKey !== 'description' && props.description) {
                generatedSubs.push({
                    id: `sub-text-${timestamp}-2`,
                    type: 'sub_text',
                    props: {
                        text: props.description,
                        variant: 'lead',
                        align: 'center',
                        color: 'muted',
                    },
                });
            }

            // 3. Buttons
            const hasPrimary = Boolean(props.primaryButtonText);
            const hasSecondary = Boolean(props.secondaryButtonText);

            if (deleteElementKey !== 'buttons' && (hasPrimary || hasSecondary)) {
                if (hasPrimary && hasSecondary) {
                    generatedSubs.push({
                        id: `sub-row-${timestamp}-3`,
                        type: 'sub_row',
                        props: {
                            columns: 2,
                            gap: 'md',
                            columnSlots: [
                                [
                                    {
                                        id: `sub-btn-${timestamp}-4`,
                                        type: 'sub_button',
                                        props: {
                                            text: props.primaryButtonText,
                                            url: props.primaryButtonUrl || '#',
                                            variant: 'primary',
                                            size: 'md',
                                        },
                                    },
                                ],
                                [
                                    {
                                        id: `sub-btn-${timestamp}-5`,
                                        type: 'sub_button',
                                        props: {
                                            text: props.secondaryButtonText,
                                            url: props.secondaryButtonUrl || '#',
                                            variant: 'secondary',
                                            size: 'md',
                                        },
                                    },
                                ],
                            ],
                        },
                    });
                } else if (hasPrimary) {
                    generatedSubs.push({
                        id: `sub-btn-${timestamp}-4`,
                        type: 'sub_button',
                        props: {
                            text: props.primaryButtonText,
                            url: props.primaryButtonUrl || '#',
                            variant: 'primary',
                            size: 'md',
                        },
                    });
                } else if (hasSecondary) {
                    generatedSubs.push({
                        id: `sub-btn-${timestamp}-5`,
                        type: 'sub_button',
                        props: {
                            text: props.secondaryButtonText,
                            url: props.secondaryButtonUrl || '#',
                            variant: 'secondary',
                            size: 'md',
                        },
                    });
                }
            }
            break;
        }

        case 'features': {
            // 1. Badge
            if (deleteElementKey !== 'badge' && props.badge) {
                generatedSubs.push({
                    id: `sub-badge-${timestamp}-1`,
                    type: 'sub_badge',
                    props: {
                        text: props.badge,
                        variant: 'primary',
                    },
                });
            }

            // 2. Title
            if (deleteElementKey !== 'title' && props.title) {
                generatedSubs.push({
                    id: `sub-text-${timestamp}-2`,
                    type: 'sub_text',
                    props: {
                        text: props.title,
                        variant: 'h2',
                        align: 'center',
                        color: 'default',
                    },
                });
            }

            // 3. Subtitle
            if (deleteElementKey !== 'subtitle' && props.subtitle) {
                generatedSubs.push({
                    id: `sub-text-${timestamp}-3`,
                    type: 'sub_text',
                    props: {
                        text: props.subtitle,
                        variant: 'lead',
                        align: 'center',
                        color: 'muted',
                    },
                });
            }

            // 4. Feature Items -> konversi ke sub_row multi-kolom
            const items = Array.isArray(props.items) ? props.items : [];
            if (deleteElementKey !== 'items' && items.length > 0) {
                const colsCount = Math.min(Math.max(items.length, 1), 4);
                const columnSlots = items.slice(0, 4).map((item, idx) => [
                    {
                        id: `sub-card-${timestamp}-${idx}`,
                        type: 'sub_card',
                        props: {
                            title: item.title || 'Feature Item',
                            description: item.description || '',
                            border: true,
                            shadow: 'md',
                        },
                    },
                ]);

                generatedSubs.push({
                    id: `sub-row-${timestamp}-items`,
                    type: 'sub_row',
                    props: {
                        columns: colsCount,
                        gap: 'md',
                        columnSlots,
                    },
                });
            }
            break;
        }

        case 'richtext': {
            // 1. Title
            if (deleteElementKey !== 'title' && props.title) {
                generatedSubs.push({
                    id: `sub-text-${timestamp}-1`,
                    type: 'sub_text',
                    props: {
                        text: props.title,
                        variant: 'h2',
                        align: props.alignment || 'left',
                        color: 'default',
                    },
                });
            }

            // 2. Content
            if (deleteElementKey !== 'content' && props.content) {
                // Strip simple HTML tags for clean sub_text rendering
                const cleanText = props.content.replace(/<\/?[^>]+(>|$)/g, ' ').trim();
                generatedSubs.push({
                    id: `sub-text-${timestamp}-2`,
                    type: 'sub_text',
                    props: {
                        text: cleanText || 'Rich text content...',
                        variant: 'body',
                        align: props.alignment || 'left',
                        color: 'muted',
                    },
                });
            }
            break;
        }

        case 'pricing': {
            // 1. Badge
            if (deleteElementKey !== 'badge' && props.badge) {
                generatedSubs.push({
                    id: `sub-badge-${timestamp}-1`,
                    type: 'sub_badge',
                    props: {
                        text: props.badge,
                        variant: 'primary',
                    },
                });
            }

            // 2. Title
            if (deleteElementKey !== 'title' && props.title) {
                generatedSubs.push({
                    id: `sub-text-${timestamp}-2`,
                    type: 'sub_text',
                    props: {
                        text: props.title,
                        variant: 'h2',
                        align: 'center',
                        color: 'default',
                    },
                });
            }

            // 3. Subtitle
            if (deleteElementKey !== 'subtitle' && props.subtitle) {
                generatedSubs.push({
                    id: `sub-text-${timestamp}-3`,
                    type: 'sub_text',
                    props: {
                        text: props.subtitle,
                        variant: 'lead',
                        align: 'center',
                        color: 'muted',
                    },
                });
            }

            // 4. Plans Grid
            const plans = Array.isArray(props.plans) ? props.plans : [];
            if (deleteElementKey !== 'plans' && plans.length > 0) {
                const colsCount = Math.min(Math.max(plans.length, 1), 4);
                const columnSlots = plans.slice(0, 4).map((p, idx) => [
                    {
                        id: `sub-card-${timestamp}-${idx}`,
                        type: 'sub_card',
                        props: {
                            title: `${p.name} - ${p.priceMonthly || ''}${p.period || ''}`,
                            description: p.description || '',
                            border: true,
                            shadow: 'md',
                        },
                    },
                ]);

                generatedSubs.push({
                    id: `sub-row-${timestamp}-plans`,
                    type: 'sub_row',
                    props: {
                        columns: colsCount,
                        gap: 'md',
                        columnSlots,
                    },
                });
            }
            break;
        }

        default: {
            // Untuk blok lainnya, jika memiliki title / description umum
            if (deleteElementKey !== 'title' && props.title) {
                generatedSubs.push({
                    id: `sub-text-${timestamp}-1`,
                    type: 'sub_text',
                    props: {
                        text: props.title,
                        variant: 'h2',
                        align: 'center',
                        color: 'default',
                    },
                });
            }
            if (deleteElementKey !== 'subtitle' && props.subtitle) {
                generatedSubs.push({
                    id: `sub-text-${timestamp}-2`,
                    type: 'sub_text',
                    props: {
                        text: props.subtitle,
                        variant: 'lead',
                        align: 'center',
                        color: 'muted',
                    },
                });
            }
            break;
        }
    }

    // Gabungkan sub-komponen baru hasil konversi dengan sub-komponen yang sudah pernah ditambahkan sebelumnya
    const combinedSubComponents = [...generatedSubs, ...existingSubs];

    return {
        ...block,
        props: {
            ...props,
            isCustom: true,
            subComponents: combinedSubComponents,
        },
    };
}
