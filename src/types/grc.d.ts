// Generated from dist/grc-schema.json

/**
 * A schema for representing a bundle of nodes and links in a Governance, Risk, and Compliance (GRC) model
 */
export type GRCBundleSchema = {
  /**
   * Unique identifier for the node
   */
  id: string;
  /**
   * Type of the node
   */
  type: 'bundle';
  [k: string]: unknown;
} & {
  /**
   * Collection of nodes in the bundle
   */
  nodes: (
    | AssertionNode
    | AttestationNode
    | ComplianceRequirementNode
    | ContactInfoNode
    | ControlNode
    | CostNode
    | EvidenceNode
    | FrameworkNode
    | LocationNode
    | MilestoneNode
    | PersonNode
    | PlanOfActionItemNode
    | PolicyNode
    | RemediationNode
    | ResourceNode
    | ResponsibilityNode
    | RiskNode
    | RoleNode
    | SystemComponentNode
    | TagNode
    | ThreatNode
    | VulnerabilityNode
  )[];
  /**
   * Collection of links between nodes
   */
  links: (
    | AffectsLink
    | AssertionRelationshipLink
    | AssignmentLink
    | ComplianceLink
    | ContactAssociationLink
    | CostAssociationLink
    | EvidenceRequirementLink
    | ExternalReferenceLink
    | FrameworkAssociationLink
    | ImplementationLink
    | LocatedAtLink
    | MilestoneAssociationLink
    | MitigationLink
    | OwnershipLink
    | ReferenceLink
    | ResponsibilityLink
    | TaggingLink
    | ThreatLink
  )[];
  /**
   * Metadata about the bundle
   */
  metadata?: {
    /**
     * Name of the bundle
     */
    name?: string;
    /**
     * Description of the bundle
     */
    description?: string;
    /**
     * Version of the bundle
     */
    version?: string;
    /**
     * Date and time when the bundle was created
     */
    createdAt?: string;
    /**
     * Date and time when the bundle was last updated
     */
    updatedAt?: string;
    /**
     * Person or entity that created the bundle
     */
    createdBy?: string;
    /**
     * Organization that owns the bundle
     */
    organization?: string;
    /**
     * Tags associated with the bundle
     */
    tags?: string[];
    [k: string]: unknown;
  };
  [k: string]: unknown;
};
/**
 * A node representing an assertion in a GRC model, which can include guidance and statements related to controls
 */
export type AssertionNode = {
  /**
   * Unique identifier for the node. Recommended to use ShortUUID format (~22 character encoded UUID, e.g., 'keATt6KQsAVXDUbZcRdg6i'). Should be globally unique across all nodes.
   */
  id: string;
  /**
   * Type of the node
   */
  type: string;
  /**
   * Optional human-readable name for the node. When migrating from descriptive IDs to ShortUUIDs, the original descriptive ID can be preserved here.
   */
  name?: string;
  [k: string]: unknown;
} & {
  type?: 'assertion';
  /**
   * Name of the assertion
   */
  name: string;
  /**
   * General description of the assertion
   */
  description?: string;
  /**
   * The main statement or claim being asserted
   */
  statement: string;
  /**
   * Guidance or instructions related to the assertion
   */
  guidance?: string;
  /**
   * Source or origin of the assertion (e.g., standard, regulation, policy)
   */
  source?: string;
  /**
   * Status of the assertion
   */
  status?: 'draft' | 'active' | 'deprecated' | 'superseded';
  /**
   * Date when the assertion was created
   */
  createdDate?: string;
  /**
   * Date when the assertion was last reviewed
   */
  lastReviewedDate?: string;
  /**
   * How often the assertion should be reviewed
   */
  reviewCycle?: 'monthly' | 'quarterly' | 'semi-annually' | 'annually' | 'as-needed';
  /**
   * Tags or keywords associated with the assertion
   */
  tags?: string[];
  /**
   * Additional structured parts of the assertion
   */
  parts?: {
    /**
     * Identifier for the part
     */
    id?: string;
    /**
     * Name of the part
     */
    name: string;
    /**
     * Content of the part
     */
    content: string;
    [k: string]: unknown;
  }[];
  [k: string]: unknown;
};
/**
 * A node representing an attestation in a GRC model
 */
export type AttestationNode = {
  /**
   * Unique identifier for the node. Recommended to use ShortUUID format (~22 character encoded UUID, e.g., 'keATt6KQsAVXDUbZcRdg6i'). Should be globally unique across all nodes.
   */
  id: string;
  /**
   * Type of the node
   */
  type: string;
  /**
   * Optional human-readable name for the node. When migrating from descriptive IDs to ShortUUIDs, the original descriptive ID can be preserved here.
   */
  name?: string;
  [k: string]: unknown;
} & {
  type?: 'attestation';
  /**
   * Name of the attestation
   */
  name: string;
  /**
   * Description of the attestation
   */
  description?: string;
  /**
   * Format of the attestation (e.g., CycloneDX, SPDX, SWID)
   */
  format: 'CycloneDX' | 'SPDX' | 'SWID' | 'Other';
  /**
   * Version of the attestation
   */
  version?: string;
  /**
   * Date and time when the attestation was created
   */
  creationDate?: string;
  /**
   * Author of the attestation
   */
  author?: string;
  /**
   * Verification status of the attestation
   */
  verificationStatus?: 'verified' | 'unverified' | 'in-progress';
  /**
   * Location or URI of the attestation document
   */
  documentLocation?: string;
  [k: string]: unknown;
};
/**
 * A node representing a compliance requirement in a GRC model
 */
export type ComplianceRequirementNode = {
  /**
   * Unique identifier for the node. Recommended to use ShortUUID format (~22 character encoded UUID, e.g., 'keATt6KQsAVXDUbZcRdg6i'). Should be globally unique across all nodes.
   */
  id: string;
  /**
   * Type of the node
   */
  type: string;
  /**
   * Optional human-readable name for the node. When migrating from descriptive IDs to ShortUUIDs, the original descriptive ID can be preserved here.
   */
  name?: string;
  [k: string]: unknown;
} & {
  type?: 'compliance-requirement';
  /**
   * Name of the compliance requirement
   */
  name: string;
  /**
   * Detailed description of the compliance requirement
   */
  description: string;
  /**
   * Identifier for the requirement (e.g., from a standard or regulation)
   */
  requirementId?: string;
  /**
   * Compliance framework the requirement belongs to (e.g., NIST CSF, ISO 27001, GDPR)
   */
  framework: string;
  /**
   * Category of the requirement within the framework
   */
  category?: string;
  /**
   * Version of the framework or standard
   */
  version?: string;
  /**
   * Applicability of the requirement to the organization
   */
  applicability?: 'applicable' | 'not-applicable' | 'partially-applicable' | 'under-review';
  /**
   * Current compliance status for the requirement
   */
  complianceStatus: 'compliant' | 'non-compliant' | 'partially-compliant' | 'not-assessed' | 'exempted';
  /**
   * Priority level for addressing the requirement
   */
  priority?: 'low' | 'medium' | 'high' | 'critical';
  /**
   * How often the requirement is assessed
   */
  assessmentFrequency?: 'continuous' | 'monthly' | 'quarterly' | 'semi-annually' | 'annually' | 'as-needed';
  /**
   * Date when the requirement was last assessed
   */
  lastAssessmentDate?: string;
  /**
   * Date when the requirement should be assessed next
   */
  nextAssessmentDate?: string;
  /**
   * Types of evidence required to demonstrate compliance
   */
  evidenceRequired?: string[];
  [k: string]: unknown;
};
/**
 * A node representing contact information in a GRC model
 */
export type ContactInfoNode = {
  /**
   * Unique identifier for the node. Recommended to use ShortUUID format (~22 character encoded UUID, e.g., 'keATt6KQsAVXDUbZcRdg6i'). Should be globally unique across all nodes.
   */
  id: string;
  /**
   * Type of the node
   */
  type: string;
  /**
   * Optional human-readable name for the node. When migrating from descriptive IDs to ShortUUIDs, the original descriptive ID can be preserved here.
   */
  name?: string;
  [k: string]: unknown;
} & {
  type?: 'contact-info';
  /**
   * Name or label for the contact information
   */
  name?: string;
  /**
   * Type of contact information
   */
  contactType: 'email' | 'phone' | 'mobile' | 'fax' | 'address' | 'website' | 'social-media' | 'messaging' | 'other';
  /**
   * Value of the contact information (e.g., email address, phone number)
   */
  value: string;
  /**
   * Category of the contact information
   */
  category?: 'work' | 'personal' | 'emergency' | 'public' | 'private' | 'other';
  /**
   * Whether this is the primary contact method of its type
   */
  isPrimary?: boolean;
  /**
   * Whether this contact information is publicly available
   */
  isPublic?: boolean;
  /**
   * Date from which this contact information is valid
   */
  validFrom?: string;
  /**
   * Date until which this contact information is valid
   */
  validUntil?: string;
  /**
   * Status of the contact information
   */
  status?: 'active' | 'inactive' | 'verified' | 'unverified';
  /**
   * Date when the contact information was last verified
   */
  verificationDate?: string;
  [k: string]: unknown;
};
/**
 * A node representing a control in a GRC model
 */
export type ControlNode = {
  /**
   * Unique identifier for the node. Recommended to use ShortUUID format (~22 character encoded UUID, e.g., 'keATt6KQsAVXDUbZcRdg6i'). Should be globally unique across all nodes.
   */
  id: string;
  /**
   * Type of the node
   */
  type: string;
  /**
   * Optional human-readable name for the node. When migrating from descriptive IDs to ShortUUIDs, the original descriptive ID can be preserved here.
   */
  name?: string;
  [k: string]: unknown;
} & {
  type?: 'control';
  /**
   * Name of the control
   */
  name: string;
  /**
   * Detailed description of the control
   */
  description: string;
  /**
   * Identifier for the control (e.g., from a framework)
   */
  controlId?: string;
  /**
   * Category of the control
   */
  category: 'preventive' | 'detective' | 'corrective' | 'deterrent' | 'recovery' | 'compensating';
  /**
   * Implementation type of the control
   */
  implementation?: 'technical' | 'administrative' | 'physical' | 'hybrid';
  /**
   * Implementation status of the control
   */
  status: 'planned' | 'implemented' | 'partially-implemented' | 'not-implemented' | 'not-applicable';
  /**
   * Level of automation for the control
   */
  automationLevel?: 'manual' | 'semi-automated' | 'automated';
  /**
   * How often the control is tested
   */
  testFrequency?: 'continuous' | 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annually' | 'as-needed';
  /**
   * Date when the control was last tested
   */
  lastTestedDate?: string;
  /**
   * Effectiveness rating of the control
   */
  effectiveness?: 'ineffective' | 'partially-effective' | 'effective' | 'highly-effective' | 'not-assessed';
  /**
   * Compliance frameworks the control addresses
   */
  frameworks?: string[];
  /**
   * Cost to implement the control
   */
  costToImplement?: number;
  /**
   * Annual cost to maintain the control
   */
  costToMaintain?: number;
  [k: string]: unknown;
};
/**
 * A node representing a cost or financial aspect in a GRC model
 */
export type CostNode = {
  /**
   * Unique identifier for the node. Recommended to use ShortUUID format (~22 character encoded UUID, e.g., 'keATt6KQsAVXDUbZcRdg6i'). Should be globally unique across all nodes.
   */
  id: string;
  /**
   * Type of the node
   */
  type: string;
  /**
   * Optional human-readable name for the node. When migrating from descriptive IDs to ShortUUIDs, the original descriptive ID can be preserved here.
   */
  name?: string;
  [k: string]: unknown;
} & {
  type?: 'cost';
  /**
   * Name of the cost
   */
  name: string;
  /**
   * Description of the cost
   */
  description?: string;
  /**
   * Amount of the cost
   */
  amount: number;
  /**
   * Currency of the cost (e.g., USD, EUR, GBP)
   */
  currency?: string;
  /**
   * Type of cost
   */
  costType: 'implementation' | 'maintenance' | 'operational' | 'capital' | 'recurring' | 'one-time' | 'other';
  /**
   * Frequency of the cost (for recurring costs)
   */
  frequency?: 'one-time' | 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annually' | 'as-needed';
  /**
   * Start date for the cost
   */
  startDate?: string;
  /**
   * End date for the cost (if applicable)
   */
  endDate?: string;
  /**
   * Budget category for the cost
   */
  budgetCategory?: string;
  /**
   * ID of the person who approved the cost
   */
  approvedBy?: string;
  /**
   * Date when the cost was approved
   */
  approvalDate?: string;
  /**
   * Status of the cost
   */
  status?: 'planned' | 'approved' | 'incurred' | 'paid' | 'cancelled';
  [k: string]: unknown;
};
/**
 * A node representing evidence in a GRC model
 */
export type EvidenceNode = {
  /**
   * Unique identifier for the node. Recommended to use ShortUUID format (~22 character encoded UUID, e.g., 'keATt6KQsAVXDUbZcRdg6i'). Should be globally unique across all nodes.
   */
  id: string;
  /**
   * Type of the node
   */
  type: string;
  /**
   * Optional human-readable name for the node. When migrating from descriptive IDs to ShortUUIDs, the original descriptive ID can be preserved here.
   */
  name?: string;
  [k: string]: unknown;
} & {
  type?: 'evidence';
  /**
   * Name of the evidence
   */
  name: string;
  /**
   * Description of the evidence
   */
  description?: string;
  /**
   * Type of evidence
   */
  evidenceType: 'document' | 'screenshot' | 'log' | 'report' | 'attestation' | 'certification' | 'other';
  /**
   * URL or location of the evidence
   */
  url?: string;
  /**
   * Date when the evidence was collected
   */
  collectionDate?: string;
  /**
   * Date when the evidence expires (if applicable)
   */
  expirationDate?: string;
  /**
   * ID of the person who collected the evidence
   */
  collectedBy?: string;
  /**
   * ID of the person who verified the evidence
   */
  verifiedBy?: string;
  /**
   * Date when the evidence was verified
   */
  verificationDate?: string;
  /**
   * Status of the evidence
   */
  status: 'collected' | 'verified' | 'expired' | 'rejected' | 'pending';
  [k: string]: unknown;
};
/**
 * A node representing a compliance or governance framework in a GRC model
 */
export type FrameworkNode = {
  /**
   * Unique identifier for the node. Recommended to use ShortUUID format (~22 character encoded UUID, e.g., 'keATt6KQsAVXDUbZcRdg6i'). Should be globally unique across all nodes.
   */
  id: string;
  /**
   * Type of the node
   */
  type: string;
  /**
   * Optional human-readable name for the node. When migrating from descriptive IDs to ShortUUIDs, the original descriptive ID can be preserved here.
   */
  name?: string;
  [k: string]: unknown;
} & {
  type?: 'framework';
  /**
   * Name of the framework
   */
  name: string;
  /**
   * Description of the framework
   */
  description?: string;
  /**
   * Version of the framework
   */
  version: string;
  /**
   * Organization that published the framework
   */
  publisher?: string;
  /**
   * Date when the framework was published
   */
  publicationDate?: string;
  /**
   * Category of the framework
   */
  category: 'security' | 'privacy' | 'compliance' | 'governance' | 'risk' | 'industry-specific' | 'other';
  /**
   * URL to the framework documentation
   */
  url?: string;
  /**
   * Applicability of the framework to the organization
   */
  applicability?: 'mandatory' | 'voluntary' | 'recommended' | 'not-applicable';
  /**
   * Status of the framework
   */
  status?: 'active' | 'deprecated' | 'superseded' | 'draft';
  /**
   * ID of the framework that supersedes this one (if applicable)
   */
  supersededBy?: string;
  [k: string]: unknown;
};
/**
 * A node representing a physical or virtual location in a GRC model
 */
export type LocationNode = {
  /**
   * Unique identifier for the node. Recommended to use ShortUUID format (~22 character encoded UUID, e.g., 'keATt6KQsAVXDUbZcRdg6i'). Should be globally unique across all nodes.
   */
  id: string;
  /**
   * Type of the node
   */
  type: string;
  /**
   * Optional human-readable name for the node. When migrating from descriptive IDs to ShortUUIDs, the original descriptive ID can be preserved here.
   */
  name?: string;
  [k: string]: unknown;
} & {
  type?: 'location';
  /**
   * Name of the location
   */
  name: string;
  /**
   * Description of the location
   */
  description?: string;
  /**
   * Type of location
   */
  locationType: 'physical' | 'virtual' | 'cloud' | 'hybrid';
  /**
   * Physical address of the location
   */
  address?: string;
  /**
   * City of the location
   */
  city?: string;
  /**
   * State or province of the location
   */
  state?: string;
  /**
   * Country of the location
   */
  country?: string;
  /**
   * Postal code of the location
   */
  postalCode?: string;
  /**
   * Geographic coordinates of the location
   */
  coordinates?: {
    /**
     * Latitude coordinate
     */
    latitude?: number;
    /**
     * Longitude coordinate
     */
    longitude?: number;
    [k: string]: unknown;
  };
  /**
   * ID of the parent location (if this is a sub-location)
   */
  parentLocation?: string;
  /**
   * Status of the location
   */
  status?: 'active' | 'inactive' | 'under-construction' | 'planned' | 'decommissioned';
  [k: string]: unknown;
};
/**
 * A node representing a milestone in a GRC model
 */
export type MilestoneNode = {
  /**
   * Unique identifier for the node. Recommended to use ShortUUID format (~22 character encoded UUID, e.g., 'keATt6KQsAVXDUbZcRdg6i'). Should be globally unique across all nodes.
   */
  id: string;
  /**
   * Type of the node
   */
  type: string;
  /**
   * Optional human-readable name for the node. When migrating from descriptive IDs to ShortUUIDs, the original descriptive ID can be preserved here.
   */
  name?: string;
  [k: string]: unknown;
} & {
  type?: 'milestone';
  /**
   * Name of the milestone
   */
  name: string;
  /**
   * Description of the milestone
   */
  description?: string;
  /**
   * Due date for the milestone
   */
  dueDate?: string;
  /**
   * Actual completion date of the milestone
   */
  completionDate?: string;
  /**
   * Status of the milestone
   */
  status: 'planned' | 'in-progress' | 'completed' | 'delayed' | 'cancelled';
  /**
   * Priority level of the milestone
   */
  priority?: 'low' | 'medium' | 'high' | 'critical';
  [k: string]: unknown;
};
/**
 * A node representing a person in a GRC model
 */
export type PersonNode = {
  /**
   * Unique identifier for the node. Recommended to use ShortUUID format (~22 character encoded UUID, e.g., 'keATt6KQsAVXDUbZcRdg6i'). Should be globally unique across all nodes.
   */
  id: string;
  /**
   * Type of the node
   */
  type: string;
  /**
   * Optional human-readable name for the node. When migrating from descriptive IDs to ShortUUIDs, the original descriptive ID can be preserved here.
   */
  name?: string;
  [k: string]: unknown;
} & {
  type?: 'person';
  /**
   * First name of the person
   */
  firstName: string;
  /**
   * Last name of the person
   */
  lastName: string;
  /**
   * Email address of the person
   */
  email: string;
  /**
   * Phone number of the person
   */
  phone?: string;
  /**
   * Department the person belongs to
   */
  department?: string;
  /**
   * Job title of the person
   */
  title?: string;
  /**
   * Employee ID of the person
   */
  employeeId?: string;
  /**
   * Employment status of the person
   */
  status?: 'active' | 'inactive' | 'contractor' | 'temporary';
  /**
   * Physical location or office of the person
   */
  location?: string;
  [k: string]: unknown;
};
/**
 * A node representing a plan of action item in a GRC model
 */
export type PlanOfActionItemNode = {
  /**
   * Unique identifier for the node. Recommended to use ShortUUID format (~22 character encoded UUID, e.g., 'keATt6KQsAVXDUbZcRdg6i'). Should be globally unique across all nodes.
   */
  id: string;
  /**
   * Type of the node
   */
  type: string;
  /**
   * Optional human-readable name for the node. When migrating from descriptive IDs to ShortUUIDs, the original descriptive ID can be preserved here.
   */
  name?: string;
  [k: string]: unknown;
} & {
  type?: 'plan-of-action-item';
  /**
   * Name of the plan of action item
   */
  name: string;
  /**
   * Detailed description of the plan of action item
   */
  description: string;
  /**
   * Current status of the plan of action item
   */
  status: 'planned' | 'in-progress' | 'completed' | 'delayed' | 'cancelled';
  /**
   * Priority level of the plan of action item
   */
  priority?: 'low' | 'medium' | 'high' | 'critical';
  /**
   * Due date for the plan of action item
   */
  dueDate?: string;
  /**
   * Start date for the plan of action item
   */
  startDate?: string;
  /**
   * Actual completion date of the plan of action item
   */
  completionDate?: string;
  /**
   * Estimated effort required to complete the plan of action item
   */
  estimatedEffort?: string;
  /**
   * List of milestones for the plan of action item
   */
  milestones?: {
    /**
     * Name of the milestone
     */
    name: string;
    /**
     * Due date for the milestone
     */
    dueDate?: string;
    /**
     * Status of the milestone
     */
    status?: 'planned' | 'in-progress' | 'completed' | 'delayed' | 'cancelled';
    [k: string]: unknown;
  }[];
  /**
   * Estimated cost to complete the plan of action item
   */
  costEstimate?: number;
  /**
   * Type of remediation
   */
  remediationType?: 'technical' | 'procedural' | 'administrative' | 'physical' | 'other';
  [k: string]: unknown;
};
/**
 * A node representing a policy in a GRC model
 */
export type PolicyNode = {
  /**
   * Unique identifier for the node. Recommended to use ShortUUID format (~22 character encoded UUID, e.g., 'keATt6KQsAVXDUbZcRdg6i'). Should be globally unique across all nodes.
   */
  id: string;
  /**
   * Type of the node
   */
  type: string;
  /**
   * Optional human-readable name for the node. When migrating from descriptive IDs to ShortUUIDs, the original descriptive ID can be preserved here.
   */
  name?: string;
  [k: string]: unknown;
} & {
  type?: 'policy';
  /**
   * Name of the policy
   */
  name: string;
  /**
   * Detailed description of the policy
   */
  description: string;
  /**
   * Category of the policy
   */
  category?: 'security' | 'privacy' | 'operational' | 'hr' | 'financial' | 'it' | 'compliance' | 'other';
  /**
   * Version of the policy
   */
  version?: string;
  /**
   * Status of the policy
   */
  status: 'draft' | 'review' | 'approved' | 'published' | 'retired' | 'superseded';
  /**
   * Date when the policy becomes effective
   */
  effectiveDate?: string;
  /**
   * Date when the policy should be reviewed
   */
  reviewDate?: string;
  /**
   * Date when the policy expires
   */
  expirationDate?: string;
  /**
   * Authority that approved the policy
   */
  approvalAuthority?: string;
  /**
   * Scope of the policy (e.g., organization-wide, department-specific)
   */
  scope?: string;
  /**
   * Location or URI of the policy document
   */
  documentLocation?: string;
  /**
   * Compliance frameworks the policy addresses
   */
  complianceFrameworks?: string[];
  [k: string]: unknown;
};
/**
 * A node representing a remediation action in a GRC model
 */
export type RemediationNode = {
  /**
   * Unique identifier for the node. Recommended to use ShortUUID format (~22 character encoded UUID, e.g., 'keATt6KQsAVXDUbZcRdg6i'). Should be globally unique across all nodes.
   */
  id: string;
  /**
   * Type of the node
   */
  type: string;
  /**
   * Optional human-readable name for the node. When migrating from descriptive IDs to ShortUUIDs, the original descriptive ID can be preserved here.
   */
  name?: string;
  [k: string]: unknown;
} & {
  type?: 'remediation';
  /**
   * Name of the remediation
   */
  name: string;
  /**
   * Detailed description of the remediation
   */
  description: string;
  /**
   * Current status of the remediation
   */
  status: 'planned' | 'in-progress' | 'completed' | 'delayed' | 'cancelled';
  /**
   * Priority level of the remediation
   */
  priority?: 'low' | 'medium' | 'high' | 'critical';
  /**
   * Due date for the remediation
   */
  dueDate?: string;
  /**
   * Start date for the remediation
   */
  startDate?: string;
  /**
   * Actual completion date of the remediation
   */
  completionDate?: string;
  /**
   * Estimated effort required to complete the remediation
   */
  estimatedEffort?: string;
  /**
   * Estimated cost to complete the remediation
   */
  costEstimate?: number;
  /**
   * Type of remediation
   */
  remediationType?: 'technical' | 'procedural' | 'administrative' | 'physical' | 'other';
  [k: string]: unknown;
};
/**
 * A node representing an external resource such as documentation, standards, or articles
 */
export type ResourceNode = {
  /**
   * Unique identifier for the node. Recommended to use ShortUUID format (~22 character encoded UUID, e.g., 'keATt6KQsAVXDUbZcRdg6i'). Should be globally unique across all nodes.
   */
  id: string;
  /**
   * Type of the node
   */
  type: string;
  /**
   * Optional human-readable name for the node. When migrating from descriptive IDs to ShortUUIDs, the original descriptive ID can be preserved here.
   */
  name?: string;
  [k: string]: unknown;
} & {
  type?: 'resource';
  /**
   * Name or title of the resource
   */
  name: string;
  /**
   * Description of the resource
   */
  description?: string;
  /**
   * URL of the resource
   */
  url: string;
  /**
   * Type of resource
   */
  resourceType: 'documentation' | 'standard' | 'regulation' | 'article' | 'tool' | 'repository' | 'website' | 'other';
  /**
   * Date when the resource was retrieved or referenced
   */
  retrievedDate?: string;
  /**
   * Version of the resource, if applicable
   */
  version?: string;
  /**
   * Author or organization that created the resource
   */
  author?: string;
  /**
   * Tags or keywords associated with the resource
   */
  tags?: string[];
  [k: string]: unknown;
};
/**
 * A node representing a responsibility in a GRC model
 */
export type ResponsibilityNode = {
  /**
   * Unique identifier for the node. Recommended to use ShortUUID format (~22 character encoded UUID, e.g., 'keATt6KQsAVXDUbZcRdg6i'). Should be globally unique across all nodes.
   */
  id: string;
  /**
   * Type of the node
   */
  type: string;
  /**
   * Optional human-readable name for the node. When migrating from descriptive IDs to ShortUUIDs, the original descriptive ID can be preserved here.
   */
  name?: string;
  [k: string]: unknown;
} & {
  type?: 'responsibility';
  /**
   * Name of the responsibility
   */
  name: string;
  /**
   * Detailed description of the responsibility
   */
  description: string;
  /**
   * Category of the responsibility
   */
  category?: 'operational' | 'managerial' | 'strategic' | 'security' | 'compliance' | 'technical' | 'other';
  /**
   * Priority level of the responsibility
   */
  priority?: 'low' | 'medium' | 'high' | 'critical';
  /**
   * How often the responsibility needs to be fulfilled
   */
  frequency?: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annually' | 'as-needed' | 'continuous';
  /**
   * Skills required to fulfill this responsibility
   */
  requiredSkills?: string[];
  /**
   * Estimated effort required to fulfill this responsibility
   */
  estimatedEffort?: string;
  /**
   * Whether this responsibility is relevant for compliance purposes
   */
  complianceRelevant?: boolean;
  [k: string]: unknown;
};
/**
 * A node representing a risk in a GRC model
 */
export type RiskNode = {
  /**
   * Unique identifier for the node. Recommended to use ShortUUID format (~22 character encoded UUID, e.g., 'keATt6KQsAVXDUbZcRdg6i'). Should be globally unique across all nodes.
   */
  id: string;
  /**
   * Type of the node
   */
  type: string;
  /**
   * Optional human-readable name for the node. When migrating from descriptive IDs to ShortUUIDs, the original descriptive ID can be preserved here.
   */
  name?: string;
  [k: string]: unknown;
} & {
  type?: 'risk';
  /**
   * Name of the risk
   */
  name: string;
  /**
   * Detailed description of the risk
   */
  description: string;
  /**
   * Category of the risk
   */
  category?:
    | 'strategic'
    | 'operational'
    | 'financial'
    | 'compliance'
    | 'reputational'
    | 'security'
    | 'privacy'
    | 'technical'
    | 'other';
  /**
   * Likelihood of the risk occurring
   */
  likelihood: 'rare' | 'unlikely' | 'possible' | 'likely' | 'almost-certain';
  /**
   * Impact if the risk occurs
   */
  impact: 'insignificant' | 'minor' | 'moderate' | 'major' | 'severe';
  /**
   * Calculated risk score
   */
  riskScore?: number;
  /**
   * Current status of the risk
   */
  status?: 'identified' | 'assessed' | 'mitigated' | 'accepted' | 'transferred' | 'avoided' | 'closed';
  /**
   * Date when the risk was identified
   */
  identificationDate?: string;
  /**
   * Date when the risk should be reviewed
   */
  reviewDate?: string;
  /**
   * Strategy for mitigating the risk
   */
  mitigationStrategy?: string;
  /**
   * Residual risk score after mitigation
   */
  residualRiskScore?: number;
  [k: string]: unknown;
};
/**
 * A node representing a role in a GRC model
 */
export type RoleNode = {
  /**
   * Unique identifier for the node. Recommended to use ShortUUID format (~22 character encoded UUID, e.g., 'keATt6KQsAVXDUbZcRdg6i'). Should be globally unique across all nodes.
   */
  id: string;
  /**
   * Type of the node
   */
  type: string;
  /**
   * Optional human-readable name for the node. When migrating from descriptive IDs to ShortUUIDs, the original descriptive ID can be preserved here.
   */
  name?: string;
  [k: string]: unknown;
} & {
  type?: 'role';
  /**
   * Name of the role
   */
  name: string;
  /**
   * Description of the role and its purpose
   */
  description?: string;
  /**
   * Category of the role (e.g., technical, managerial, executive)
   */
  category?: 'technical' | 'managerial' | 'executive' | 'administrative' | 'security' | 'compliance' | 'other';
  /**
   * Access level associated with the role
   */
  accessLevel?: 'low' | 'medium' | 'high' | 'admin';
  /**
   * Department the role belongs to
   */
  department?: string;
  /**
   * Whether the role has approval authority
   */
  approvalAuthority?: boolean;
  /**
   * List of certifications required for the role
   */
  requiredCertifications?: string[];
  /**
   * List of training required for the role
   */
  requiredTraining?: string[];
  [k: string]: unknown;
};
/**
 * A node representing a system component in a GRC model
 */
export type SystemComponentNode = {
  /**
   * Unique identifier for the node. Recommended to use ShortUUID format (~22 character encoded UUID, e.g., 'keATt6KQsAVXDUbZcRdg6i'). Should be globally unique across all nodes.
   */
  id: string;
  /**
   * Type of the node
   */
  type: string;
  /**
   * Optional human-readable name for the node. When migrating from descriptive IDs to ShortUUIDs, the original descriptive ID can be preserved here.
   */
  name?: string;
  [k: string]: unknown;
} & {
  type?: 'system-component';
  /**
   * Name of the system component
   */
  name: string;
  /**
   * Description of the system component
   */
  description?: string;
  /**
   * Version of the system component
   */
  version?: string;
  /**
   * Status of the system component (e.g., active, deprecated, planned)
   */
  status?: 'active' | 'deprecated' | 'planned' | 'retired';
  /**
   * Owner of the system component
   */
  owner?: string;
  /**
   * Criticality level of the system component
   */
  criticality?: 'low' | 'medium' | 'high' | 'critical';
  /**
   * Category of the system component (e.g., hardware, software, network)
   */
  category?: 'hardware' | 'software' | 'network' | 'service' | 'data' | 'other';
  [k: string]: unknown;
};
/**
 * A node representing a tag or keyword in a GRC model
 */
export type TagNode = {
  /**
   * Unique identifier for the node. Recommended to use ShortUUID format (~22 character encoded UUID, e.g., 'keATt6KQsAVXDUbZcRdg6i'). Should be globally unique across all nodes.
   */
  id: string;
  /**
   * Type of the node
   */
  type: string;
  /**
   * Optional human-readable name for the node. When migrating from descriptive IDs to ShortUUIDs, the original descriptive ID can be preserved here.
   */
  name?: string;
  [k: string]: unknown;
} & {
  type?: 'tag';
  /**
   * Name of the tag
   */
  name: string;
  /**
   * Description of the tag
   */
  description?: string;
  /**
   * Category of the tag (e.g., technical, business, compliance)
   */
  category?: string;
  /**
   * Color code for visual representation of the tag
   */
  color?: string;
  /**
   * ID of the parent tag (if this tag is part of a hierarchy)
   */
  parentTag?: string;
  [k: string]: unknown;
};
/**
 * A node representing a threat in a GRC model
 */
export type ThreatNode = {
  /**
   * Unique identifier for the node. Recommended to use ShortUUID format (~22 character encoded UUID, e.g., 'keATt6KQsAVXDUbZcRdg6i'). Should be globally unique across all nodes.
   */
  id: string;
  /**
   * Type of the node
   */
  type: string;
  /**
   * Optional human-readable name for the node. When migrating from descriptive IDs to ShortUUIDs, the original descriptive ID can be preserved here.
   */
  name?: string;
  [k: string]: unknown;
} & {
  type?: 'threat';
  /**
   * Name of the threat
   */
  name: string;
  /**
   * Detailed description of the threat
   */
  description: string;
  /**
   * Category of the threat
   */
  category: 'cyber' | 'physical' | 'natural' | 'human' | 'supply-chain' | 'insider' | 'other';
  /**
   * Source of the threat
   */
  source?: 'internal' | 'external' | 'partner' | 'unknown';
  /**
   * Type of threat actor
   */
  threatActor?: 'nation-state' | 'criminal' | 'hacktivist' | 'insider' | 'competitor' | 'natural' | 'unknown';
  /**
   * Motivation behind the threat
   */
  motivation?: 'financial' | 'political' | 'espionage' | 'sabotage' | 'revenge' | 'accidental' | 'unknown';
  /**
   * Capability level of the threat actor
   */
  capability?: 'low' | 'medium' | 'high' | 'advanced' | 'unknown';
  /**
   * Likelihood of the threat materializing
   */
  likelihood?: 'rare' | 'unlikely' | 'possible' | 'likely' | 'almost-certain';
  /**
   * Potential impact if the threat materializes
   */
  potentialImpact?: 'insignificant' | 'minor' | 'moderate' | 'major' | 'severe';
  /**
   * Tactics used by the threat (e.g., MITRE ATT&CK tactics)
   */
  tactics?: string[];
  /**
   * Techniques used by the threat (e.g., MITRE ATT&CK techniques)
   */
  techniques?: string[];
  /**
   * Indicators of the threat
   */
  indicators?: string[];
  [k: string]: unknown;
};
/**
 * A node representing a vulnerability in a GRC model
 */
export type VulnerabilityNode = {
  /**
   * Unique identifier for the node. Recommended to use ShortUUID format (~22 character encoded UUID, e.g., 'keATt6KQsAVXDUbZcRdg6i'). Should be globally unique across all nodes.
   */
  id: string;
  /**
   * Type of the node
   */
  type: string;
  /**
   * Optional human-readable name for the node. When migrating from descriptive IDs to ShortUUIDs, the original descriptive ID can be preserved here.
   */
  name?: string;
  [k: string]: unknown;
} & {
  type?: 'vulnerability';
  /**
   * Name of the vulnerability
   */
  name: string;
  /**
   * Detailed description of the vulnerability
   */
  description: string;
  /**
   * Identifier for the vulnerability (e.g., CVE ID)
   */
  vulnerabilityId?: string;
  /**
   * Category of the vulnerability
   */
  category?: 'software' | 'hardware' | 'network' | 'physical' | 'personnel' | 'process' | 'other';
  /**
   * Severity level of the vulnerability
   */
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
  /**
   * CVSS score of the vulnerability
   */
  cvssScore?: number;
  /**
   * Current status of the vulnerability
   */
  status: 'identified' | 'confirmed' | 'remediated' | 'mitigated' | 'accepted' | 'false-positive';
  /**
   * Date when the vulnerability was discovered
   */
  discoveryDate?: string;
  /**
   * Date when the vulnerability was published
   */
  publishedDate?: string;
  /**
   * Due date for remediation of the vulnerability
   */
  remediationDueDate?: string;
  /**
   * Exploitability assessment of the vulnerability
   */
  exploitability?: 'unproven' | 'proof-of-concept' | 'functional' | 'high' | 'not-defined';
  /**
   * Complexity of remediation
   */
  remediationComplexity?: 'low' | 'medium' | 'high';
  /**
   * Steps to remediate the vulnerability
   */
  remediationSteps?: string;
  /**
   * Components affected by the vulnerability
   */
  affectedComponents?: string[];
  [k: string]: unknown;
};
/**
 * A link representing how a vulnerability affects a system component
 */
export type AffectsLink = ({
  /**
   * Unique identifier for the node. Recommended to use ShortUUID format (~22 character encoded UUID, e.g., 'keATt6KQsAVXDUbZcRdg6i'). Should be globally unique across all nodes.
   */
  id: string;
  /**
   * Type of the node
   */
  type: string;
  /**
   * Optional human-readable name for the node. When migrating from descriptive IDs to ShortUUIDs, the original descriptive ID can be preserved here.
   */
  name?: string;
  [k: string]: unknown;
} & {
  /**
   * ID of the source node
   */
  origin: string;
  /**
   * ID of the target node
   */
  target: string;
  /**
   * Type of the source node
   */
  originType?: '*';
  /**
   * Type of the target node
   */
  targetType?: '*';
  /**
   * Type of relationship between the nodes
   */
  relationship: string;
  [k: string]: unknown;
}) & {
  type?: 'affects';
  relationship?: 'affects';
  /**
   * Severity of the impact on the affected component
   */
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
  /**
   * Exploitability of the vulnerability on this component
   */
  exploitability?: 'easy' | 'moderate' | 'difficult' | 'very-difficult';
  /**
   * Version of the component affected by the vulnerability
   */
  affectedVersion?: string;
  /**
   * Version of the component where the vulnerability is fixed
   */
  fixedVersion?: string;
  /**
   * Specific functionality of the component affected by the vulnerability
   */
  affectedFunctionality?: string;
  /**
   * Workaround for the vulnerability on this component
   */
  workaround?: string;
  [k: string]: unknown;
};
/**
 * A link representing a relationship between an assertion and a control
 */
export type AssertionRelationshipLink = ({
  /**
   * Unique identifier for the node. Recommended to use ShortUUID format (~22 character encoded UUID, e.g., 'keATt6KQsAVXDUbZcRdg6i'). Should be globally unique across all nodes.
   */
  id: string;
  /**
   * Type of the node
   */
  type: string;
  /**
   * Optional human-readable name for the node. When migrating from descriptive IDs to ShortUUIDs, the original descriptive ID can be preserved here.
   */
  name?: string;
  [k: string]: unknown;
} & {
  /**
   * ID of the source node
   */
  origin: string;
  /**
   * ID of the target node
   */
  target: string;
  /**
   * Type of the source node
   */
  originType?: '*';
  /**
   * Type of the target node
   */
  targetType?: '*';
  /**
   * Type of relationship between the nodes
   */
  relationship: string;
  [k: string]: unknown;
}) & {
  type?: 'assertion-relationship';
  relationship?: 'asserts';
  /**
   * Type of assertion relationship
   */
  assertionType:
    | 'compliance'
    | 'implementation'
    | 'verification'
    | 'validation'
    | 'guidance'
    | 'clarification'
    | 'interpretation';
  /**
   * Status of the assertion relationship
   */
  status: 'proposed' | 'accepted' | 'rejected' | 'under-review' | 'superseded';
  /**
   * Level of confidence in the assertion
   */
  confidence?: 'low' | 'medium' | 'high' | 'very-high';
  /**
   * Date when the assertion relationship was created
   */
  createdDate?: string;
  /**
   * Date when the assertion relationship was last reviewed
   */
  lastReviewedDate?: string;
  /**
   * Person or entity that reviewed the assertion relationship
   */
  reviewedBy?: string;
  /**
   * Reference to evidence supporting the assertion
   */
  evidenceReference?: string;
  /**
   * Additional notes about the assertion relationship
   */
  notes?: string;
  [k: string]: unknown;
};
/**
 * A link representing an assignment relationship between nodes
 */
export type AssignmentLink = ({
  /**
   * Unique identifier for the node. Recommended to use ShortUUID format (~22 character encoded UUID, e.g., 'keATt6KQsAVXDUbZcRdg6i'). Should be globally unique across all nodes.
   */
  id: string;
  /**
   * Type of the node
   */
  type: string;
  /**
   * Optional human-readable name for the node. When migrating from descriptive IDs to ShortUUIDs, the original descriptive ID can be preserved here.
   */
  name?: string;
  [k: string]: unknown;
} & {
  /**
   * ID of the source node
   */
  origin: string;
  /**
   * ID of the target node
   */
  target: string;
  /**
   * Type of the source node
   */
  originType?: '*';
  /**
   * Type of the target node
   */
  targetType?: '*';
  /**
   * Type of relationship between the nodes
   */
  relationship: string;
  [k: string]: unknown;
}) & {
  type?: 'assignment';
  relationship?: 'assignedTo';
  /**
   * Type of assignment relationship
   */
  assignmentType: 'primary' | 'secondary' | 'temporary' | 'backup' | 'rotational';
  /**
   * Date when the assignment began
   */
  startDate?: string;
  /**
   * Date when the assignment ends or ended
   */
  endDate?: string;
  /**
   * Person or entity that made the assignment
   */
  assignedBy?: string;
  /**
   * Percentage of time or effort allocated to this assignment
   */
  assignmentPercentage?: number;
  /**
   * Status of the assignment
   */
  status: 'active' | 'inactive' | 'pending' | 'completed';
  /**
   * Type of the source node
   */
  originType?: 'person';
  /**
   * Type of the target node
   */
  targetType?: 'role' | 'responsibility';
  [k: string]: unknown;
};
/**
 * A link representing a compliance relationship between nodes
 */
export type ComplianceLink = ({
  /**
   * Unique identifier for the node. Recommended to use ShortUUID format (~22 character encoded UUID, e.g., 'keATt6KQsAVXDUbZcRdg6i'). Should be globally unique across all nodes.
   */
  id: string;
  /**
   * Type of the node
   */
  type: string;
  /**
   * Optional human-readable name for the node. When migrating from descriptive IDs to ShortUUIDs, the original descriptive ID can be preserved here.
   */
  name?: string;
  [k: string]: unknown;
} & {
  /**
   * ID of the source node
   */
  origin: string;
  /**
   * ID of the target node
   */
  target: string;
  /**
   * Type of the source node
   */
  originType?: '*';
  /**
   * Type of the target node
   */
  targetType?: '*';
  /**
   * Type of relationship between the nodes
   */
  relationship: string;
  [k: string]: unknown;
}) & {
  type?: 'compliance';
  relationship?: 'satisfies';
  /**
   * Type of compliance relationship
   */
  complianceType: 'fully-satisfies' | 'partially-satisfies' | 'contributes-to' | 'implements' | 'demonstrates';
  /**
   * Status of the compliance relationship
   */
  status: 'planned' | 'implemented' | 'verified' | 'audited' | 'non-compliant';
  /**
   * Method used to verify compliance
   */
  verificationMethod?:
    | 'documentation-review'
    | 'interview'
    | 'observation'
    | 'testing'
    | 'automated-check'
    | 'third-party-assessment';
  /**
   * Date when compliance was verified
   */
  verificationDate?: string;
  /**
   * Date when compliance should be verified next
   */
  nextVerificationDate?: string;
  /**
   * Person or entity that verified compliance
   */
  verifiedBy?: string;
  /**
   * Location or reference to compliance evidence
   */
  evidenceLocation?: string;
  /**
   * Additional notes about the compliance relationship
   */
  notes?: string;
  [k: string]: unknown;
};
/**
 * A link representing an association between contact information and another node
 */
export type ContactAssociationLink = ({
  /**
   * Unique identifier for the node. Recommended to use ShortUUID format (~22 character encoded UUID, e.g., 'keATt6KQsAVXDUbZcRdg6i'). Should be globally unique across all nodes.
   */
  id: string;
  /**
   * Type of the node
   */
  type: string;
  /**
   * Optional human-readable name for the node. When migrating from descriptive IDs to ShortUUIDs, the original descriptive ID can be preserved here.
   */
  name?: string;
  [k: string]: unknown;
} & {
  /**
   * ID of the source node
   */
  origin: string;
  /**
   * ID of the target node
   */
  target: string;
  /**
   * Type of the source node
   */
  originType?: '*';
  /**
   * Type of the target node
   */
  targetType?: '*';
  /**
   * Type of relationship between the nodes
   */
  relationship: string;
  [k: string]: unknown;
}) & {
  type?: 'contact-association';
  relationship?: 'has-contact';
  /**
   * Type of contact association
   */
  associationType: 'primary' | 'secondary' | 'emergency' | 'technical' | 'administrative' | 'billing' | 'other';
  /**
   * Priority order of this contact method (lower number = higher priority)
   */
  priority?: number;
  /**
   * Purpose of this contact association
   */
  purpose?: string;
  /**
   * Status of the contact association
   */
  status?: 'active' | 'inactive' | 'preferred' | 'deprecated';
  /**
   * Date when this contact association became active
   */
  startDate?: string;
  /**
   * Date when this contact association became inactive
   */
  endDate?: string;
  [k: string]: unknown;
};
/**
 * A link representing an association between a cost and another node
 */
export type CostAssociationLink = ({
  /**
   * Unique identifier for the node. Recommended to use ShortUUID format (~22 character encoded UUID, e.g., 'keATt6KQsAVXDUbZcRdg6i'). Should be globally unique across all nodes.
   */
  id: string;
  /**
   * Type of the node
   */
  type: string;
  /**
   * Optional human-readable name for the node. When migrating from descriptive IDs to ShortUUIDs, the original descriptive ID can be preserved here.
   */
  name?: string;
  [k: string]: unknown;
} & {
  /**
   * ID of the source node
   */
  origin: string;
  /**
   * ID of the target node
   */
  target: string;
  /**
   * Type of the source node
   */
  originType?: '*';
  /**
   * Type of the target node
   */
  targetType?: '*';
  /**
   * Type of relationship between the nodes
   */
  relationship: string;
  [k: string]: unknown;
}) & {
  type?: 'cost-association';
  relationship?: 'has-cost';
  /**
   * Type of cost association
   */
  associationType: 'direct' | 'indirect' | 'allocated' | 'estimated' | 'actual';
  /**
   * Percentage of the cost allocated to this node (0-100)
   */
  percentage?: number;
  /**
   * Method used to allocate the cost
   */
  allocationMethod?: 'equal' | 'proportional' | 'usage-based' | 'manual' | 'other';
  /**
   * Notes about the cost association
   */
  notes?: string;
  [k: string]: unknown;
};
/**
 * A link representing a requirement for evidence or the fulfillment of an evidence requirement
 */
export type EvidenceRequirementLink = ({
  /**
   * Unique identifier for the node. Recommended to use ShortUUID format (~22 character encoded UUID, e.g., 'keATt6KQsAVXDUbZcRdg6i'). Should be globally unique across all nodes.
   */
  id: string;
  /**
   * Type of the node
   */
  type: string;
  /**
   * Optional human-readable name for the node. When migrating from descriptive IDs to ShortUUIDs, the original descriptive ID can be preserved here.
   */
  name?: string;
  [k: string]: unknown;
} & {
  /**
   * ID of the source node
   */
  origin: string;
  /**
   * ID of the target node
   */
  target: string;
  /**
   * Type of the source node
   */
  originType?: '*';
  /**
   * Type of the target node
   */
  targetType?: '*';
  /**
   * Type of relationship between the nodes
   */
  relationship: string;
  [k: string]: unknown;
}) & {
  type?: 'evidence-requirement';
  relationship?: 'requires-evidence';
  /**
   * Type of evidence requirement
   */
  requirementType: 'mandatory' | 'optional' | 'supporting' | 'alternative';
  /**
   * Status of the evidence requirement
   */
  status: 'required' | 'fulfilled' | 'partially-fulfilled' | 'exempted' | 'expired';
  /**
   * Date when the evidence requirement was fulfilled
   */
  fulfillmentDate?: string;
  /**
   * Date when the evidence should be reviewed
   */
  reviewDate?: string;
  /**
   * ID of the person who reviewed the evidence
   */
  reviewedBy?: string;
  /**
   * Notes about the evidence requirement
   */
  notes?: string;
  /**
   * Type of the source node
   */
  originType?: 'compliance-requirement' | 'control' | 'policy';
  /**
   * Type of the target node
   */
  targetType?: 'evidence';
  [k: string]: unknown;
};
/**
 * A link representing an external reference to resources on the internet
 */
export type ExternalReferenceLink = ({
  /**
   * Unique identifier for the node. Recommended to use ShortUUID format (~22 character encoded UUID, e.g., 'keATt6KQsAVXDUbZcRdg6i'). Should be globally unique across all nodes.
   */
  id: string;
  /**
   * Type of the node
   */
  type: string;
  /**
   * Optional human-readable name for the node. When migrating from descriptive IDs to ShortUUIDs, the original descriptive ID can be preserved here.
   */
  name?: string;
  [k: string]: unknown;
} & {
  /**
   * ID of the source node
   */
  origin: string;
  /**
   * ID of the target node
   */
  target: string;
  /**
   * Type of the source node
   */
  originType?: '*';
  /**
   * Type of the target node
   */
  targetType?: '*';
  /**
   * Type of relationship between the nodes
   */
  relationship: string;
  [k: string]: unknown;
}) & {
  type?: 'external-reference';
  relationship?: 'references';
  /**
   * IDs of the source nodes
   *
   * @minItems 1
   */
  origin?: [string, ...string[]];
  /**
   * IDs of the target nodes (optional for external references)
   */
  target?: string[];
  /**
   * URL of the external resource
   */
  url: string;
  /**
   * Type of external reference
   */
  referenceType: 'documentation' | 'standard' | 'regulation' | 'article' | 'tool' | 'repository' | 'website' | 'other';
  /**
   * Title or name of the external resource
   */
  title?: string;
  /**
   * Description of the external resource
   */
  description?: string;
  /**
   * Date when the external resource was retrieved or referenced
   */
  retrievedDate?: string;
  /**
   * Version of the external resource, if applicable
   */
  version?: string;
  /**
   * Author or organization that created the external resource
   */
  author?: string;
  /**
   * Tags or keywords associated with the external resource
   */
  tags?: string[];
  [k: string]: unknown;
};
/**
 * A link representing an association between a framework and another node
 */
export type FrameworkAssociationLink = ({
  /**
   * Unique identifier for the node. Recommended to use ShortUUID format (~22 character encoded UUID, e.g., 'keATt6KQsAVXDUbZcRdg6i'). Should be globally unique across all nodes.
   */
  id: string;
  /**
   * Type of the node
   */
  type: string;
  /**
   * Optional human-readable name for the node. When migrating from descriptive IDs to ShortUUIDs, the original descriptive ID can be preserved here.
   */
  name?: string;
  [k: string]: unknown;
} & {
  /**
   * ID of the source node
   */
  origin: string;
  /**
   * ID of the target node
   */
  target: string;
  /**
   * Type of the source node
   */
  originType?: '*';
  /**
   * Type of the target node
   */
  targetType?: '*';
  /**
   * Type of relationship between the nodes
   */
  relationship: string;
  [k: string]: unknown;
}) & {
  type?: 'framework-association';
  relationship?: 'associated-with';
  /**
   * Type of association with the framework
   */
  associationType: 'implements' | 'references' | 'maps-to' | 'derived-from' | 'complies-with';
  /**
   * Reference to the specific section or control in the framework
   */
  mappingReference?: string;
  /**
   * Compliance status with the framework
   */
  complianceStatus?: 'compliant' | 'non-compliant' | 'partially-compliant' | 'not-assessed' | 'not-applicable';
  /**
   * Notes about the mapping or association
   */
  mappingNotes?: string;
  /**
   * Date when compliance was last assessed
   */
  lastAssessmentDate?: string;
  [k: string]: unknown;
};
/**
 * A link representing an implementation relationship between nodes
 */
export type ImplementationLink = ({
  /**
   * Unique identifier for the node. Recommended to use ShortUUID format (~22 character encoded UUID, e.g., 'keATt6KQsAVXDUbZcRdg6i'). Should be globally unique across all nodes.
   */
  id: string;
  /**
   * Type of the node
   */
  type: string;
  /**
   * Optional human-readable name for the node. When migrating from descriptive IDs to ShortUUIDs, the original descriptive ID can be preserved here.
   */
  name?: string;
  [k: string]: unknown;
} & {
  /**
   * ID of the source node
   */
  origin: string;
  /**
   * ID of the target node
   */
  target: string;
  /**
   * Type of the source node
   */
  originType?: '*';
  /**
   * Type of the target node
   */
  targetType?: '*';
  /**
   * Type of relationship between the nodes
   */
  relationship: string;
  [k: string]: unknown;
}) & {
  type?: 'implementation';
  relationship?: 'implements';
  /**
   * Type of implementation relationship
   */
  implementationType: 'full' | 'partial' | 'planned' | 'inherited' | 'compensating';
  /**
   * Status of the implementation
   */
  status: 'planned' | 'in-progress' | 'implemented' | 'verified' | 'deprecated';
  /**
   * Date when the implementation was completed
   */
  implementationDate?: string;
  /**
   * Planned date for implementation completion
   */
  plannedCompletionDate?: string;
  /**
   * Date when the implementation was last reviewed
   */
  lastReviewDate?: string;
  /**
   * Date when the implementation should be reviewed next
   */
  nextReviewDate?: string;
  /**
   * Person or entity that performed the implementation
   */
  implementedBy?: string;
  /**
   * Person or entity that verified the implementation
   */
  verifiedBy?: string;
  /**
   * Effectiveness of the implementation
   */
  effectiveness?: 'ineffective' | 'partially-effective' | 'effective' | 'highly-effective' | 'not-assessed';
  /**
   * Reference to implementation documentation
   */
  documentReference?: string;
  [k: string]: unknown;
};
/**
 * A link representing that a node is located at a specific location
 */
export type LocatedAtLink = ({
  /**
   * Unique identifier for the node. Recommended to use ShortUUID format (~22 character encoded UUID, e.g., 'keATt6KQsAVXDUbZcRdg6i'). Should be globally unique across all nodes.
   */
  id: string;
  /**
   * Type of the node
   */
  type: string;
  /**
   * Optional human-readable name for the node. When migrating from descriptive IDs to ShortUUIDs, the original descriptive ID can be preserved here.
   */
  name?: string;
  [k: string]: unknown;
} & {
  /**
   * ID of the source node
   */
  origin: string;
  /**
   * ID of the target node
   */
  target: string;
  /**
   * Type of the source node
   */
  originType?: '*';
  /**
   * Type of the target node
   */
  targetType?: '*';
  /**
   * Type of relationship between the nodes
   */
  relationship: string;
  [k: string]: unknown;
}) & {
  type?: 'located-at';
  relationship?: 'located-at';
  /**
   * Type of location relationship
   */
  locationType: 'primary' | 'secondary' | 'temporary' | 'historical';
  /**
   * Date when the entity started being at this location
   */
  startDate?: string;
  /**
   * Date when the entity stopped being at this location (if applicable)
   */
  endDate?: string;
  /**
   * Status of the location relationship
   */
  status?: 'active' | 'inactive' | 'planned' | 'historical';
  /**
   * Notes about the location relationship
   */
  notes?: string;
  [k: string]: unknown;
};
/**
 * A link representing an association between a milestone and another node
 */
export type MilestoneAssociationLink = ({
  /**
   * Unique identifier for the node. Recommended to use ShortUUID format (~22 character encoded UUID, e.g., 'keATt6KQsAVXDUbZcRdg6i'). Should be globally unique across all nodes.
   */
  id: string;
  /**
   * Type of the node
   */
  type: string;
  /**
   * Optional human-readable name for the node. When migrating from descriptive IDs to ShortUUIDs, the original descriptive ID can be preserved here.
   */
  name?: string;
  [k: string]: unknown;
} & {
  /**
   * ID of the source node
   */
  origin: string;
  /**
   * ID of the target node
   */
  target: string;
  /**
   * Type of the source node
   */
  originType?: '*';
  /**
   * Type of the target node
   */
  targetType?: '*';
  /**
   * Type of relationship between the nodes
   */
  relationship: string;
  [k: string]: unknown;
}) & {
  type?: 'milestone-association';
  relationship?: 'has-milestone';
  /**
   * Type of association between the node and the milestone
   */
  associationType: 'primary' | 'secondary' | 'dependent';
  /**
   * Status of the milestone association
   */
  status?: 'active' | 'inactive' | 'completed';
  /**
   * Order of the milestone in a sequence (if applicable)
   */
  order?: number;
  [k: string]: unknown;
};
/**
 * A link representing a mitigation relationship between nodes
 */
export type MitigationLink = ({
  /**
   * Unique identifier for the node. Recommended to use ShortUUID format (~22 character encoded UUID, e.g., 'keATt6KQsAVXDUbZcRdg6i'). Should be globally unique across all nodes.
   */
  id: string;
  /**
   * Type of the node
   */
  type: string;
  /**
   * Optional human-readable name for the node. When migrating from descriptive IDs to ShortUUIDs, the original descriptive ID can be preserved here.
   */
  name?: string;
  [k: string]: unknown;
} & {
  /**
   * ID of the source node
   */
  origin: string;
  /**
   * ID of the target node
   */
  target: string;
  /**
   * Type of the source node
   */
  originType?: '*';
  /**
   * Type of the target node
   */
  targetType?: '*';
  /**
   * Type of relationship between the nodes
   */
  relationship: string;
  [k: string]: unknown;
}) & {
  type?: 'mitigation';
  relationship?: 'mitigates';
  /**
   * Type of mitigation relationship
   */
  mitigationType: 'preventive' | 'detective' | 'corrective' | 'compensating' | 'deterrent' | 'recovery';
  /**
   * Effectiveness of the mitigation
   */
  effectiveness: 'ineffective' | 'partially-effective' | 'effective' | 'highly-effective' | 'not-assessed';
  /**
   * Date when the mitigation was implemented
   */
  implementationDate?: string;
  /**
   * Date when the mitigation was last reviewed
   */
  lastReviewDate?: string;
  /**
   * Date when the mitigation should be reviewed next
   */
  nextReviewDate?: string;
  /**
   * Residual risk level after mitigation
   */
  residualRiskLevel?: 'negligible' | 'low' | 'medium' | 'high' | 'critical';
  /**
   * Status of the mitigation
   */
  status: 'planned' | 'implemented' | 'verified' | 'ineffective' | 'retired';
  /**
   * Person or entity that verified the mitigation
   */
  verifiedBy?: string;
  [k: string]: unknown;
};
/**
 * A link representing an ownership relationship between nodes
 */
export type OwnershipLink = ({
  /**
   * Unique identifier for the node. Recommended to use ShortUUID format (~22 character encoded UUID, e.g., 'keATt6KQsAVXDUbZcRdg6i'). Should be globally unique across all nodes.
   */
  id: string;
  /**
   * Type of the node
   */
  type: string;
  /**
   * Optional human-readable name for the node. When migrating from descriptive IDs to ShortUUIDs, the original descriptive ID can be preserved here.
   */
  name?: string;
  [k: string]: unknown;
} & {
  /**
   * ID of the source node
   */
  origin: string;
  /**
   * ID of the target node
   */
  target: string;
  /**
   * Type of the source node
   */
  originType?: '*';
  /**
   * Type of the target node
   */
  targetType?: '*';
  /**
   * Type of relationship between the nodes
   */
  relationship: string;
  [k: string]: unknown;
}) & {
  type?: 'ownership';
  relationship?: 'owns';
  /**
   * Type of ownership relationship
   */
  ownershipType: 'primary' | 'secondary' | 'delegated' | 'temporary' | 'custodial';
  /**
   * Date when the ownership began
   */
  startDate?: string;
  /**
   * Date when the ownership ends or ended
   */
  endDate?: string;
  /**
   * Person or entity that approved the ownership
   */
  approvedBy?: string;
  /**
   * Reference to a document that establishes the ownership
   */
  documentReference?: string;
  [k: string]: unknown;
};
/**
 * A link representing a reference to a resource node
 */
export type ReferenceLink = ({
  /**
   * Unique identifier for the node. Recommended to use ShortUUID format (~22 character encoded UUID, e.g., 'keATt6KQsAVXDUbZcRdg6i'). Should be globally unique across all nodes.
   */
  id: string;
  /**
   * Type of the node
   */
  type: string;
  /**
   * Optional human-readable name for the node. When migrating from descriptive IDs to ShortUUIDs, the original descriptive ID can be preserved here.
   */
  name?: string;
  [k: string]: unknown;
} & {
  /**
   * ID of the source node
   */
  origin: string;
  /**
   * ID of the target node
   */
  target: string;
  /**
   * Type of the source node
   */
  originType?: '*';
  /**
   * Type of the target node
   */
  targetType?: '*';
  /**
   * Type of relationship between the nodes
   */
  relationship: string;
  [k: string]: unknown;
}) & {
  type?: 'reference';
  relationship?: 'references';
  /**
   * Optional context or note about the reference
   */
  context?: string;
  /**
   * Relevance of the reference
   */
  relevance?: 'high' | 'medium' | 'low';
  [k: string]: unknown;
};
/**
 * A link representing a responsibility relationship between nodes
 */
export type ResponsibilityLink = ({
  /**
   * Unique identifier for the node. Recommended to use ShortUUID format (~22 character encoded UUID, e.g., 'keATt6KQsAVXDUbZcRdg6i'). Should be globally unique across all nodes.
   */
  id: string;
  /**
   * Type of the node
   */
  type: string;
  /**
   * Optional human-readable name for the node. When migrating from descriptive IDs to ShortUUIDs, the original descriptive ID can be preserved here.
   */
  name?: string;
  [k: string]: unknown;
} & {
  /**
   * ID of the source node
   */
  origin: string;
  /**
   * ID of the target node
   */
  target: string;
  /**
   * Type of the source node
   */
  originType?: '*';
  /**
   * Type of the target node
   */
  targetType?: '*';
  /**
   * Type of relationship between the nodes
   */
  relationship: string;
  [k: string]: unknown;
}) & {
  type?: 'responsibility-assignment';
  relationship?: 'responsible-for';
  /**
   * Type of responsibility relationship
   */
  responsibilityType: 'accountable' | 'responsible' | 'consulted' | 'informed' | 'supportive';
  /**
   * Date when the responsibility began
   */
  startDate?: string;
  /**
   * Date when the responsibility ends or ended
   */
  endDate?: string;
  /**
   * Person or entity that delegated the responsibility
   */
  delegatedBy?: string;
  /**
   * Person or entity to whom the responsibility is delegated
   */
  delegatedTo?: string;
  /**
   * Status of the responsibility
   */
  status: 'active' | 'inactive' | 'delegated' | 'revoked';
  /**
   * Reference to a document that establishes the responsibility
   */
  documentReference?: string;
  [k: string]: unknown;
};
/**
 * A link representing a tagging relationship between a tag and another node
 */
export type TaggingLink = ({
  /**
   * Unique identifier for the node. Recommended to use ShortUUID format (~22 character encoded UUID, e.g., 'keATt6KQsAVXDUbZcRdg6i'). Should be globally unique across all nodes.
   */
  id: string;
  /**
   * Type of the node
   */
  type: string;
  /**
   * Optional human-readable name for the node. When migrating from descriptive IDs to ShortUUIDs, the original descriptive ID can be preserved here.
   */
  name?: string;
  [k: string]: unknown;
} & {
  /**
   * ID of the source node
   */
  origin: string;
  /**
   * ID of the target node
   */
  target: string;
  /**
   * Type of the source node
   */
  originType?: '*';
  /**
   * Type of the target node
   */
  targetType?: '*';
  /**
   * Type of relationship between the nodes
   */
  relationship: string;
  [k: string]: unknown;
}) & {
  type?: 'tagging';
  relationship?: 'tagged-with';
  /**
   * Weight or relevance of the tag to the node (0-1)
   */
  weight?: number;
  /**
   * ID of the person who added the tag
   */
  addedBy?: string;
  /**
   * Date and time when the tag was added
   */
  addedDate?: string;
  /**
   * Type of the source node
   */
  originType?: '*';
  /**
   * Type of the target node
   */
  targetType?: 'tag';
  [k: string]: unknown;
};
/**
 * A link representing a threat relationship between nodes
 */
export type ThreatLink = ({
  /**
   * Unique identifier for the node. Recommended to use ShortUUID format (~22 character encoded UUID, e.g., 'keATt6KQsAVXDUbZcRdg6i'). Should be globally unique across all nodes.
   */
  id: string;
  /**
   * Type of the node
   */
  type: string;
  /**
   * Optional human-readable name for the node. When migrating from descriptive IDs to ShortUUIDs, the original descriptive ID can be preserved here.
   */
  name?: string;
  [k: string]: unknown;
} & {
  /**
   * ID of the source node
   */
  origin: string;
  /**
   * ID of the target node
   */
  target: string;
  /**
   * Type of the source node
   */
  originType?: '*';
  /**
   * Type of the target node
   */
  targetType?: '*';
  /**
   * Type of relationship between the nodes
   */
  relationship: string;
  [k: string]: unknown;
}) & {
  type?: 'threat-relationship';
  relationship?: 'threatens';
  /**
   * Type of threat relationship
   */
  threatType: 'exploits' | 'targets' | 'compromises' | 'disrupts' | 'damages' | 'accesses' | 'modifies' | 'destroys';
  /**
   * Likelihood of the threat materializing
   */
  likelihood: 'rare' | 'unlikely' | 'possible' | 'likely' | 'almost-certain';
  /**
   * Impact if the threat materializes
   */
  impact: 'insignificant' | 'minor' | 'moderate' | 'major' | 'severe';
  /**
   * Vector or path of the attack
   */
  attackVector?: 'network' | 'physical' | 'adjacent' | 'local' | 'social' | 'supply-chain';
  /**
   * Complexity of executing the attack
   */
  attackComplexity?: 'low' | 'medium' | 'high';
  /**
   * Level of privileges required to execute the attack
   */
  privilegesRequired?: 'none' | 'low' | 'high';
  /**
   * Whether user interaction is required for the attack
   */
  userInteraction?: boolean;
  /**
   * Exploitability assessment
   */
  exploitability?: 'unproven' | 'proof-of-concept' | 'functional' | 'high' | 'not-defined';
  /**
   * Date when the threat was last assessed
   */
  lastAssessmentDate?: string;
  [k: string]: unknown;
};
