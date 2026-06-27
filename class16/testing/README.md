attachShadow() only
First render
↓
Create shadow root ✅

Second render
↓
Try to create another shadow root ❌ Error

shadowRoot || attachShadow()
First render
↓
No shadow root
↓
Create one ✅

Second render
↓
Shadow root exists
↓
Reuse it ✅

Third render
↓
Reuse it again ✅
