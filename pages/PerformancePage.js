class PerformancePage {
    constructor(page) {
        this.page = page;
    }

    async measurePageLoad(url) {
        const startTime = Date.now();
        await this.page.goto(url);
        await this.page.waitForLoadState('networkidle');
        const endTime = Date.now();
        return endTime - startTime;
    }

    async getPerformanceMetrics() {
        const navigationStart = await this.page.evaluate(() => {
            return performance.getEntriesByType('navigation')[0];
        });

        return {
            navigationToResponse: navigationStart ? navigationStart.responseEnd : 0,
            domComplete: navigationStart ? navigationStart.domComplete : 0,
            totalLoad: navigationStart ? navigationStart.loadEventEnd : 0
        };
    }

    async getCPUMemoryMetrics() {
        return this.page.evaluate(() => {
            const memory = window.performance?.memory;
            return {
                jsHeapSize: memory ? Math.round(memory.usedJSHeapSize / (1024 * 1024)) : 'Not available',
                totalHeapSize: memory ? Math.round(memory.totalJSHeapSize / (1024 * 1024)) : 'Not available',
                heapLimit: memory ? Math.round(memory.jsHeapSizeLimit / (1024 * 1024)) : 'Not available'
            };
        });
    }

    async measureActionTime(action) {
        try {
            const startTime = Date.now();
            await action();
            const endTime = Date.now();
            return endTime - startTime;
        } catch (error) {
            console.error('Error measuring action time:', error);
            throw error;
        }
    }
}

module.exports = PerformancePage;