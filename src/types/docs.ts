// Documentation metadata types
export interface ExampleMetadata {
  title: string;
  description: string;
  category?: string;
  tags?: string[];
  relatedExamples?: string[];
  components: ComponentVersion[]; // Required - minimum one component version
}

export interface ComponentVersion {
  id: string;
  title: string;
  description: string;
  props?: PropDocumentation[];
  usage?: UsageExample[];
  notes?: string[];
}

export interface PropDocumentation {
  name: string;
  type: string;
  description: string;
  required?: boolean;
  defaultValue?: string;
  examples?: string[];
}

export interface UsageExample {
  title: string;
  description?: string;
  code: string;
}

export interface ComponentExample {
  name: string;
  title: string;
  description: string;
  category?: string;
  tags?: string[];
  filename: string;
  code: string;
  metadata?: ExampleMetadata | null; // some examples have null
  props?: PropDocumentation[];
  usage?: UsageExample[];
  notes?: string[];
  relatedExamples?: string[];
}

export interface ComponentDocumentation {
  name: string;
  description: string;
  componentCode: string;
  examples: ComponentExample[];
  generatedAt: string;
}
