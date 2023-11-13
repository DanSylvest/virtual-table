import React from 'react';

export type ComponentChildren = React.ReactElement[] | React.ReactElement;
export type ChildrenFunc = (({ visibleRows, start }: { visibleRows: number, start: number }) => ComponentChildren);
