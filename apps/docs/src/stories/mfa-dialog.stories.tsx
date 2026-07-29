import type { Meta, StoryObj } from "@storybook/react";
import { MfaDialog } from "@arc-ui/auth";
import { withMockAuth } from "./auth-decorator.js";
import { ArcIdClient } from "@arc-ui/sdk";
import * as React from "react";
import { Button } from "@arc-ui/components";

const meta: Meta<typeof MfaDialog> = {
  title: "Auth/MfaDialog",
  component: MfaDialog,
  decorators: [withMockAuth],
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MfaDialog>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    const client = React.useMemo(() => new ArcIdClient({ baseUrl: "https://auth.arcevo.dev/api/v1" }), []);

    return (
      <>
        <Button variant="outline" onClick={() => setOpen(true)}>
          Open MFA Dialog
        </Button>
        <MfaDialog
          open={open}
          onOpenChange={setOpen}
          client={client}
          sessionId="sess_mock_001"
          onComplete={(result) => {
            console.log("MFA complete", result);
            setOpen(false);
          }}
          onCancel={() => setOpen(false)}
        />
      </>
    );
  },
};
