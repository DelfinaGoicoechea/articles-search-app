function debounce(fn, delayMs) {
	let timeoutId = null;

	return function (...args) {
	  const context = this;
		
		if(timeoutId !== null) { 
		  clearTimeout(timeoutId);
		}
		
		timeoutId = setTimeout(() => {
			fn.call(context, ...args);
		}, delayMs);
	}
}

// ===== usage example =====

function logMessage(message) {
    console.log("Executed: ", message, "at ", new Date().toISOString());
}

const debounceLog = debounce(logMessage, 1000);

debounceLog("Call 1");
debounceLog("Call 2");
debounceLog("Call 3");