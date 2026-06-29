"use client";

import { useCallback, useEffect, useRef } from "react";
import { track } from "@/lib/analytics";

// Tracks field-level interactions on a form. Returns handlers to spread onto
// the <form> element. Fires:
//   - form_start         : on first field focus (once per mount)
//   - form_field_complete: when a field with a value loses focus (once per field)
//   - form_validation_error (call manually from your zod handler)
//   - form_submit        : on submit
//   - form_abandon       : on unmount/unload if started but not submitted,
//                          including last_field_touched + fields_completed_count
export function useFormTracking(formName: string) {
  const startedRef = useRef(false);
  const submittedRef = useRef(false);
  const startedAtRef = useRef(0);
  const completedFieldsRef = useRef(new Set<string>());
  const lastFieldRef = useRef<string>("");

  const onFocus = useCallback(
    (e: React.FocusEvent<HTMLFormElement>) => {
      const target = e.target as unknown as HTMLInputElement;
      if (!target.name) return;
      lastFieldRef.current = target.name;
      if (!startedRef.current) {
        startedRef.current = true;
        startedAtRef.current = performance.now();
        track("form_start", { form_name: formName });
      }
    },
    [formName],
  );

  const onBlur = useCallback(
    (e: React.FocusEvent<HTMLFormElement>) => {
      const target = e.target as unknown as HTMLInputElement;
      if (!target.name || typeof target.value !== "string") return;
      if (target.value.length > 0 && !completedFieldsRef.current.has(target.name)) {
        completedFieldsRef.current.add(target.name);
        track("form_field_complete", {
          form_name: formName,
          field_name: target.name,
          field_count: completedFieldsRef.current.size,
        });
      }
    },
    [formName],
  );

  const markSubmitted = useCallback(() => {
    submittedRef.current = true;
    track("form_submit", {
      form_name: formName,
      fields_completed_count: completedFieldsRef.current.size,
      time_in_form_ms: Math.round(performance.now() - startedAtRef.current),
    });
  }, [formName]);

  const trackValidationError = useCallback(
    (fieldName: string, errorType: string) => {
      track("form_validation_error", {
        form_name: formName,
        field_name: fieldName,
        error_type: errorType,
      });
    },
    [formName],
  );

  useEffect(() => {
    const started = startedRef;
    const submitted = submittedRef;
    const lastField = lastFieldRef;
    const completed = completedFieldsRef;
    const startedAt = startedAtRef;
    return () => {
      if (started.current && !submitted.current) {
        track("form_abandon", {
          form_name: formName,
          last_field_touched: lastField.current || "(none)",
          fields_completed_count: completed.current.size,
          time_in_form_ms: Math.round(performance.now() - startedAt.current),
        });
      }
    };
  }, [formName]);

  return { onFocus, onBlur, markSubmitted, trackValidationError };
}
