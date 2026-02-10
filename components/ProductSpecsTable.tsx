import React from 'react';
import type { Lang } from '@/lib/i18n';

interface ProductSpecsTableProps {
  headers: {
    zh: string[];
    en: string[];
  };
  rows: string[][];
  lang: Lang;
}

export const ProductSpecsTable: React.FC<ProductSpecsTableProps> = ({ headers, rows, lang }) => {
  const currentHeaders = lang === 'zh' ? headers.zh : headers.en;

  return (
    <div className="w-full overflow-hidden rounded-lg border border-border bg-card shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted/50 text-muted-foreground font-medium">
            <tr>
              {currentHeaders.map((header, index) => (
                <th key={index} className="px-4 py-3 whitespace-nowrap border-b border-border">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((row, rowIndex) => (
              <tr 
                key={rowIndex} 
                className="hover:bg-muted/30 transition-colors"
              >
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-4 py-3 whitespace-nowrap text-foreground">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
