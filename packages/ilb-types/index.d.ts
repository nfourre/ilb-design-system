/**
 * Type for svg files
 */
declare module '*.svg' {
  const content: string;
  export default content;
}

/**
 * Types for css files
 */
declare module '*.scss' {
  import { CSSResultArray } from 'lit';

  const content: CSSResultArray;
  export default content;
}
