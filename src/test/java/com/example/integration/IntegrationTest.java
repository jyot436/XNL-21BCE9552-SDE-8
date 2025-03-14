package com.example.integration;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import com.example.App;

public class IntegrationTest {
    @Test
    public void testIntegration() {
        App app = new App();
        int result = app.add(5, 6);
        assertEquals(11, result, "Integration test failed!");
    }
}