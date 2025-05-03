import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { ComparisonTableProps } from './ComparisonTable.types';
import * as S from './ComparisonTable.styles';
import { Group } from '@mantine/core';
import { IconUser, IconCpu, IconListDetails, IconTag } from '@tabler/icons-react';
import { usePathname } from 'next/navigation';

// Replace framer-motion with CSS transitions
export const ComparisonTableDesktop: React.FC<ComparisonTableProps> = ({
    leftTitle,
    rightTitle,
    items,
    variant = 'default',
    className,
}) => {
    const pathname = usePathname();
    const isHomePage = pathname === '/';

    // Only use accent/dark variant on homepage
    const effectiveVariant = isHomePage ? variant : 'default';

    const [ref, inView] = useInView({
        triggerOnce: true,
        rootMargin: "-100px",
        threshold: 0.1
    });

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (inView) {
            setIsVisible(true);
        }
    }, [inView]);

    // Determine icon color based on variant for headers
    const headerIconColor = effectiveVariant === 'accent' ? 'var(--mantine-color-white)' : 'var(--mantine-color-text)';
    // Icon color for body cells can be standard text color
    const bodyIconColor = 'var(--mantine-color-text)';

    return (
        <S.Container className={className} ref={ref}>
            <S.Table $variant={effectiveVariant} className={isVisible ? 'visible' : ''}>
                <S.TableHead $variant={effectiveVariant}>
                    <tr>
                        <S.TableHeaderCell>
                            <Group gap="xs" wrap="nowrap">
                                <IconListDetails size={18} color={headerIconColor} />
                                <span>Category</span>
                            </Group>
                        </S.TableHeaderCell>
                        <S.TableHeaderCell>
                            <Group gap="xs" wrap="nowrap">
                                <IconUser size={18} color={headerIconColor} />
                                <span>{leftTitle}</span>
                            </Group>
                        </S.TableHeaderCell>
                        <S.TableHeaderCell>
                            <Group gap="xs" wrap="nowrap">
                                <IconCpu size={18} color={headerIconColor} />
                                <span>{rightTitle}</span>
                            </Group>
                        </S.TableHeaderCell>
                    </tr>
                </S.TableHead>
                <S.TableBody>
                    {items.map((item, index) => (
                        <S.TableRow
                            key={index}
                            className={isVisible ? 'visible' : ''}
                            style={{ '--item-index': index } as React.CSSProperties}
                        >
                            <S.CategoryCell>
                                <Group gap="xs" wrap="nowrap">
                                    <IconTag size={16} color={bodyIconColor} />
                                    <span>{item.category}</span>
                                </Group>
                            </S.CategoryCell>
                            <S.TableCell>{item.leftContent}</S.TableCell>
                            <S.TableCell>{item.rightContent}</S.TableCell>
                        </S.TableRow>
                    ))}
                </S.TableBody>
            </S.Table>
        </S.Container>
    );
}; 