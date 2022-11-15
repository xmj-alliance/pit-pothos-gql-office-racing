import { assertEquals } from "std/testing/asserts.ts";

Deno.test(
  { name: "Test Happiness" },
  () => {
    assertEquals("😊", "😊");
  },
);
