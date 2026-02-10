import { describe, it, expect, vi } from 'vitest';

// Mock OpenAI to prevent credential check at module load
vi.mock('openai', () => ({
  default: vi.fn().mockImplementation(() => ({
    embeddings: {
      create: vi.fn(),
    },
  })),
}));

vi.mock('./db.js', () => ({
  getPool: vi.fn(),
}));

import { detectLanguage, extractKeywords, expandQueryKeywords } from './search.js';

describe('search utilities', () => {
  describe('detectLanguage', () => {
    it('should detect Chinese text', () => {
      expect(detectLanguage('你好世界')).toBe('zh');
      expect(detectLanguage('压缩机产品')).toBe('zh');
      expect(detectLanguage('船用空气压缩机')).toBe('zh');
    });

    it('should detect English text', () => {
      expect(detectLanguage('hello world')).toBe('en');
      expect(detectLanguage('marine compressor')).toBe('en');
      expect(detectLanguage('What products do you have?')).toBe('en');
    });

    it('should detect mixed text with Chinese characters as Chinese', () => {
      expect(detectLanguage('ISO 9001质量管理')).toBe('zh');
      expect(detectLanguage('CCS船级社认证')).toBe('zh');
    });

    it('should detect pure numbers/symbols as English', () => {
      expect(detectLanguage('12345')).toBe('en');
      expect(detectLanguage('ISO 9001')).toBe('en');
    });

    it('should handle empty string', () => {
      expect(detectLanguage('')).toBe('en');
    });
  });

  describe('extractKeywords', () => {
    it('should extract English keywords by splitting on whitespace', () => {
      const result = extractKeywords('marine compressor products', 'en');
      expect(result).toContain('marine');
      expect(result).toContain('compressor');
      expect(result).toContain('products');
    });

    it('should filter out single-char English terms', () => {
      const result = extractKeywords('a big compressor', 'en');
      expect(result).not.toContain('a');
      expect(result).toContain('big');
      expect(result).toContain('compressor');
    });

    it('should extract Chinese CJK runs and 2-char grams', () => {
      const result = extractKeywords('你有什么案例', 'zh');
      // Full run
      expect(result).toContain('你有什么案例');
      // 2-char grams should include "案例"
      expect(result).toContain('案例');
      expect(result).toContain('什么');
    });

    it('should extract Chinese keywords from mixed text', () => {
      const result = extractKeywords('船用压缩机有哪些型号', 'zh');
      expect(result).toContain('压缩');
      expect(result).toContain('船用');
      expect(result).toContain('型号');
    });

    it('should also extract English terms from Chinese queries', () => {
      const result = extractKeywords('CCS船级社认证', 'zh');
      expect(result).toContain('CCS');
      expect(result).toContain('船级');
    });

    it('should handle empty input', () => {
      expect(extractKeywords('', 'zh')).toEqual([]);
      expect(extractKeywords('', 'en')).toEqual([]);
    });

    it('should deduplicate keywords', () => {
      const result = extractKeywords('压缩压缩机', 'zh');
      // "压缩" appears in both positions but should only be once
      const count = result.filter(k => k === '压缩').length;
      expect(count).toBe(1);
    });
  });

  describe('expandQueryKeywords', () => {
    it('should expand "案例" queries with project-related terms', () => {
      const result = expandQueryKeywords('你有什么案例', 'zh');
      expect(result).toContain('工程案例');
      expect(result).toContain('案例');
      expect(result).toContain('项目');
    });

    it('should expand "产品" queries with product terms', () => {
      const result = expandQueryKeywords('有哪些产品', 'zh');
      expect(result).toContain('产品');
      expect(result).toContain('压缩机');
      expect(result).toContain('型号');
    });

    it('should expand "资质" queries with certification terms', () => {
      const result = expandQueryKeywords('资质认证情况', 'zh');
      expect(result).toContain('资质认证');
      expect(result).toContain('船级社');
    });

    it('should expand English queries', () => {
      const result = expandQueryKeywords('What certifications do you have?', 'en');
      expect(result).toContain('certification');
      expect(result).toContain('classification society');
    });

    it('should expand marine-related queries', () => {
      const result = expandQueryKeywords('船用压缩机', 'zh');
      expect(result).toContain('船用压缩机');
      expect(result).toContain('船舶');
    });

    it('should match multiple domain rules', () => {
      const result = expandQueryKeywords('船用产品认证', 'zh');
      // Should match both marine, products, and certifications rules
      expect(result).toContain('船用压缩机');
      expect(result).toContain('产品');
      expect(result).toContain('资质认证');
    });

    it('should return empty for unrecognized queries', () => {
      const result = expandQueryKeywords('今天天气怎么样', 'zh');
      expect(result).toEqual([]);
    });

    it('should expand patent queries', () => {
      const result = expandQueryKeywords('你们有多少专利', 'zh');
      expect(result).toContain('专利技术');
      expect(result).toContain('发明专利');
    });

    it('should expand contact queries', () => {
      const result = expandQueryKeywords('怎么联系你们', 'zh');
      expect(result).toContain('联系我们');
      expect(result).toContain('电话');
    });
  });
});
