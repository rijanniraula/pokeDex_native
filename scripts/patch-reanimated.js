const fs = require("fs");
const path = require("path");

const cmakeFile = path.join(
  __dirname,
  "..",
  "node_modules",
  "react-native-reanimated",
  "android",
  "CMakeLists.txt"
);

if (fs.existsSync(cmakeFile)) {
  console.log("🔧 Patching react-native-reanimated CMakeLists.txt...");

  let content = fs.readFileSync(cmakeFile, "utf8");

  // Replace -Werror with -Wno-error=deprecated-declarations
  content = content.replace(
    /-Wall -Werror/g,
    "-Wall -Wno-error=deprecated-declarations"
  );

  fs.writeFileSync(cmakeFile, content);
  console.log("✅ Successfully patched react-native-reanimated");
} else {
  console.log("⚠️  CMakeLists.txt not found, skipping patch");
}
