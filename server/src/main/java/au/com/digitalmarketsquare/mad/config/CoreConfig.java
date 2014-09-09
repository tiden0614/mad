package au.com.digitalmarketsquare.mad.config;

import au.com.digitalmarketsquare.mad.core.service.DemoEventHandler;
import au.com.digitalmarketsquare.mad.core.service.DemoService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Created by tiden on 9/9/14.
 */
@Configuration
public class CoreConfig {
    @Bean
    public DemoService demoService() {
        return new DemoEventHandler();
    }
}
