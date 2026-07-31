/**
 * Collapsible: expand/collapse section built on Radix Collapsible primitive.
 *
 * Usage:
 *   <Collapsible>
 *     <CollapsibleTrigger>Toggle</CollapsibleTrigger>
 *     <CollapsibleContent>Hidden content</CollapsibleContent>
 *   </Collapsible>
 */

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";

const Collapsible = CollapsiblePrimitive.Root;
const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;
const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent;

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
