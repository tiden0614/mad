package au.com.digitalmarketsquare.mad.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

/**
 * Created by tiden on 9/9/14.
 */
@Configuration
@EnableWebMvc
@ComponentScan(basePackages = {"au.com.digitalmarketsquare.mad.web.controller"})
public class WebConfig {
}
